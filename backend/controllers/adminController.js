import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";

export const adminRegister = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(400).send({ message: "Send All Required Fields" });
    }

    const data = await Admin.find({ email: req.body.email });
    //console.log(data);
    if (data.length === 0) {
      const saltrounds = 10;
      const hash = await bcrypt.hash(req.body.password, saltrounds);

      const newAdmin = {
        email: req.body.email,
        password: hash,
      };

      const registerResponse = await Admin.create(newAdmin);

      if (!registerResponse) {
        return res.status(500).send({ message: "Failed To Create Admin" });
      }

      return res.status(200).send(registerResponse);
    } else {
      res
        .status(400)
        .send({ message: "Allready Admin Exist Using Same Email ID" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

const generateAccessToken = (id, email) => {
  return jwt.sign({ adminId: id, email: email }, process.env.TOKEN_SECRET);
};

export const adminLogin = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(400).send({ message: "Send all required fields........" });
    }

    const response = await Admin.findOne({ email: req.body.email });
    //console.log("response", response);
    if (response === null) {
      return res
        .status(500)
        .send({ message: "No Admin Details Found By This EmailID" });
    }

    if (response) {
      const match = bcrypt.compareSync(req.body.password, response.password);

      if (match) {
        return res.status(200).send({
          message: "Admin Login Succesful",
          token: generateAccessToken(response._id, response.email),
          email: response.email,
          adminId: response._id,
        });
      } else {
        return res.status(500).send({ message: "Password Is Wrong" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};
