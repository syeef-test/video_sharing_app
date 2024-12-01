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

export const getUser = async (req, res, next) => {
  try {
    const userDetails = await User.find({ status: true });
    if (userDetails.length > 0) {
      return res
        .status(200)
        .json({ message: "User Data Found", data: userDetails });
    } else {
      return res.status(200).send({ message: "No User Data Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    if (!req.body.email || !req.body.password) {
      res.status(400).send({ message: "Send Email And Password" });
    }

    if (!userId) {
      res.status(400).send({ message: "Send User Id" });
    }

    const saltrounds = 10;
    const hash = await bcrypt.hash(req.body.password, saltrounds);

    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        email: req.body.email,
        password: hash,
      },
      { new: true }
    );

    if (!updateUser) {
      return res.status(404).send({ message: "User Not Found" });
    }

    return res.status(200).send({ message: "User Updated", data: updateUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      res.status(400).send({ message: "Send User Id" });
    }

    const deleteUser = await User.findByIdAndUpdate(
      userId,
      { status: false },
      { new: true }
    );

    if (!deleteUser) {
      return res.status(404).send({ message: "User Not Found" });
    }

    return res.status(200).send({
      message: "User Deleted Succesfully",
      data: deleteUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};
