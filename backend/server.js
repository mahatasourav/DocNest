import express from "express";
import cors from "cors";

import connectDB from "./config/mongodb.js";
import dotenv from "dotenv";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoutes.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";
dotenv.config();

//app config
const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

// middlewares

app.use(express.json());

app.use(
  cors({
    origin: "*", // or restrict to your frontend Render URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// api endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("api working ");
});

//localhost:4000/api/admin

app.listen(port, () => {
  console.log("server started at", "http://localhost:4000");
});
