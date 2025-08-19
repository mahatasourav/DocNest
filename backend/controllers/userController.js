import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import connectCloudinary from "../config/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import Razorpay from "razorpay";

//Api to user Register

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }
    // validating email
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please provide a valide email address",
      });
    }

    // validating password

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "enter a strong password",
      });
    }
    //hashing password

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashPassword,
    };

    const newUser = new userModel(userData);

    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log("error is ", error);
    res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "user does not exist " });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid creadetials  " });
    }
  } catch (error) {
    console.log("error is ", error);
    res.json({ success: false, message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const { userId } = req;
    // console.log("req", req);
    const userData = await userModel.findById(userId).select("-password");

    return res.json({ success: true, userData });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Api to update profile
const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, address, dob, gender } = req.body;
    const imageFile = req.file;
    console.log("req body is here", req.userId);
    const user = req.userId;

    if (!name || !phone) {
      return res.json({ success: false, message: "Missing Data" });
    }

    await userModel.findByIdAndUpdate(user, {
      name,
      phone,

      address: JSON.parse(address),
      dob,
      gender,
    });

    //upload image to cloudinary

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(user, { image: imageURL });
    }

    return res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log("error", error);
    return res.json({ success: false, message: error.message });
  }
};

// API to book apointment

const bookAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { docId, slotDate, slotTime } = req.body;
    console.log("req body for appointmnet booking", req.body);

    const docData = await doctorModel.findById(docId).select("-password");
    if (!docData.available) {
      return res.json({ success: false, message: "Doctor is not available" });
    }

    let slots_booked = docData.slots_booked;
    // Checking for slot availability

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");

    delete docData.slots_booked;
    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };
    const newAppointment = new appointmentModel(appointmentData);

    await newAppointment.save();

    // Save new slotData in docData
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.log("error", error);
    return res.json({ success: false, message: error.message });
  }
};
// get appointments list for user
const getAppointmentList = async (req, res) => {
  try {
    const userId = req.userId;
    const apointments = await appointmentModel.find({ userId });

    res.json({ success: true, apointments });
  } catch (error) {
    console.log("error", error);
    return res.json({ success: false, message: error.message });
  }
};

// API to create cancel appointments functionaliy

const cancellAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (userId !== appointmentData.userId) {
      return res.json({ success: false, message: "Unauthorized action " });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });
    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Cancelled " });
  } catch (error) {
    console.log("error", error);
    return res.json({ success: false, message: error.message });
  }
};

const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    console.log("appointmentid", appointmentId);
    const appointmentData = await appointmentModel.findById(appointmentId);
    console.log("KEY_ID:", process.env.RAZORPAY_KEY_ID);
    console.log("KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET);
    // console.log("appoint ment data", appointmentData);
    if (!appointmentId || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment Cancelled or not found",
      });
    }
    const razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID, // from Razorpay Dashboard
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    // creating options for razorpay payment
    const options = {
      amount: appointmentData.amount * 10,
      currency: process.env.CURRENCY || "INR",
      receipt: appointmentId,
    };

    // creation of an order
    const order = await razorpayInstance.orders.create(options);
    console.log("order", order);
    res.json({ success: true, order });
  } catch (error) {
    console.log("error", error);
    return res.json({ success: false, message: error.message });
  }
};

const verifyRazorpay = async (req, res) => {
  try {
    const razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID, // from Razorpay Dashboard
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    console.log("orderInfo", orderInfo);
    if (orderInfo.status === "paid") {
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {
        payment: true,
      });
      res.json({ success: true, message: "Payment Successful" });
    } else {
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.log("error", error);
    return res.json({ success: false, message: error.message });
  }
};
export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  getAppointmentList,
  cancellAppointment,
  paymentRazorpay,
  verifyRazorpay,
};
