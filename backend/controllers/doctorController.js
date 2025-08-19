import doctorModel from "../models/doctorModel.js";

const changeAvailablity = async (req, res) => {
  try {
    console.log("req", req.body);
    const { docId } = req.body;
    console.log("docId", docId);
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availablity Changed" });
  } catch (error) {
    console.log("error", error);
    res.json({ success: false, message: error.message });
  }
};
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    return res.json({ success: true, doctors });
  } catch (error) {
    console.log("error", error);
    return res.json({ success: false, message: " error.message" });
  }
};
export { changeAvailablity, getAllDoctors };
