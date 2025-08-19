import express from "express";
import { getAllDoctors } from "../controllers/doctorController.js";

const doctorRouter = express.Router();

doctorRouter.get("/doctor-list", getAllDoctors);

export default doctorRouter;
