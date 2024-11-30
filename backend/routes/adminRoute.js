import express from "express";
import { adminRegister, adminLogin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/adminLogin", adminLogin);
router.post("/adminRegister", adminRegister);

export default router;
