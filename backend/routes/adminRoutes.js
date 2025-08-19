import express from "express";
import {
  addDoctor,
  admidLogin,
  allDoctors,
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
export default adminRouter;
