import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const addUser = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(400).send({ message: "Send All Required Fields" });
    }

    const data = await User.find({ email: req.body.email });
    console.log(data);

    if (data.length === 0) {
      const saltrounds = 10;
      const hash = await bcrypt.hash(req.body.password, saltrounds);

      const newUser = {
        email: req.body.email,
        password: hash,
      };

      const addUserResponse = await User.create(newUser);

      if (!addUserResponse) {
        return res.status(500).send({ message: "Failed To Create User" });
      }

      return res.status(200).send(addUserResponse);
    } else {
      res
        .status(400)
        .send({ message: "Allready User Exist Using Same Email ID" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const getUser = async (req, res, next) => {};

export const updateUser = async (req, res, next) => {};

export const deleteUser = async (req, res, next) => {};
