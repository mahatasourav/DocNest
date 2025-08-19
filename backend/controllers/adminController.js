import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import { json } from "express";
import jwt from "jsonwebtoken";
// API for adding doctors
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;

    console.log(
      {
        name,
        email,
        password,
        degree,
        experience,
        about,
        fees,
        address,
        speciality,
      },
      imageFile
    );

    //check for all data to add doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !fees ||
      !degree ||
      !address
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing details" });
    }
    // validating email format

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }

    // validating strong password
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Please enter strong password ",
      });
    }
    //hashing doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const doctorSchema = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };
    const newDoctor = new doctorModel(doctorSchema);
    await newDoctor.save();
    return res.json({ success: true, message: "Doctor Added " });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const admidLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log("error", error);
    return res.json({ success: false, message: error.message });
  }
};

const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    return res.json({ success: true, doctors });
  } catch (error) {
    console.log("error ", error);
    return res.json({ success: false, message: error.message });
  }
};
export { addDoctor, admidLogin, allDoctors };
