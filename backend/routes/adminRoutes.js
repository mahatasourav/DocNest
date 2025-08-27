import express from "express";
import {
  addDoctor,
  admidLogin,
  adminDashboard,
  allAppointments,
  allDoctors,
  cancelledAppointmentAdmin,
} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailablity } from "../controllers/doctorController.js";

const adminRouter = express.Router();

adminRouter.post(
  "/add-doctor",
  authAdmin,
  upload.single("imageFile"),
  addDoctor
);
adminRouter.post("/login", admidLogin);

adminRouter.get("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/change-availablity", authAdmin, changeAvailablity);
adminRouter.get("/all-appointments", authAdmin, allAppointments);
adminRouter.post(
  "/cancelled-appointment",
  authAdmin,
  cancelledAppointmentAdmin
);
adminRouter.get("/dashboard", authAdmin, adminDashboard);

export default adminRouter;
