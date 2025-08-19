import mongoose from "mongoose";
mongoose.set("strictQuery", true);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    process.exit(1); // optional: exit the app if DB fails
  }
};

export default connectDB;
