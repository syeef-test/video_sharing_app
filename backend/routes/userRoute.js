import express from "express";
import {
  addUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

import authenticate from "../middleware/auth.js";

const router = express.Router();

router.post("/addUser", authenticate, addUser);
router.get("/getUser", authenticate, getUser);
router.put("/updateUser/:userId", authenticate, updateUser);
router.delete("/deleteUser/:userId", authenticate, deleteUser);

export default router;
