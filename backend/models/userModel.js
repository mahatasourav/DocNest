import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: {
    type: String,
    default:
      "data:image/png;base64,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",
  },
  address: { type: Object, default: { line1: "", line2: "" } },
  gender: { type: String, default: "Not selected" },
  dob: { type: String, default: "Not selected" },
  phone: { type: String, default: "0000000000" },
});

const userModel = mongoose.model.user || mongoose.model("user", userSchema);

export default userModel;
