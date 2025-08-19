import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  try {
    const atoken = req.headers.atoken;
    console.log("atoken", atoken);

    if (!atoken) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized login again" });
    }
    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
    console.log("atoken", token_decode);
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorize login again " });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default authAdmin;
