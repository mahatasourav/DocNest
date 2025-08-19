import express from "express";

import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  getAppointmentList,
  cancellAppointment,
  paymentRazorpay,
  verifyRazorpay,
} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authUser, getProfile);
userRouter.post(
  "/update-profile",
  upload.single("imageFile"),
  authUser,
  updateProfile
);
userRouter.post("/book-apointment", authUser, bookAppointment);
userRouter.get("/get-appointment-list", authUser, getAppointmentList);
userRouter.post("/cancell-apointment", authUser, cancellAppointment);
userRouter.post("/payment-razorpay", authUser, paymentRazorpay);
userRouter.post("/verify-razorpay", authUser, verifyRazorpay);

export default userRouter;
