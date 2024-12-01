import express from "express";
import {
  addUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/addUser", addUser);
router.get("/getUser", getUser);
router.put("/updateUser/:userId", updateUser);
router.delete("/deleteUser/:userId", deleteUser);

export default router;
