import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";

const authenticate = async (req, res, next) => {
  try {
    const jwt_token = req.header("authorization");
    const admin = jwt.verify(jwt_token, process.env.TOKEN_SECRET);

    const adminDetails = await Admin.findById(admin.adminId);

    if (!adminDetails) {
      res.status(401).json({ message: "Admin Details Not Found" });
    }

    req.admin = adminDetails;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Authentication failed" });
  }
};

export default authenticate;
