import express from "express";
import {
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/addCategory", addCategory);
router.get("/getCategory", getCategory);
router.put("/updateCategory/:categoryId", updateCategory);
router.delete("/deleteCategory/:categoryId", deleteCategory);
export default router;
