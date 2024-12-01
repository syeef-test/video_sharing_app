import express from "express";
import {
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

import authenticate from "../middleware/auth.js";

const router = express.Router();

router.post("/addCategory", authenticate, addCategory);
router.get("/getCategory", authenticate, getCategory);
router.put("/updateCategory/:categoryId", authenticate, updateCategory);
router.delete("/deleteCategory/:categoryId", authenticate, deleteCategory);

export default router;
