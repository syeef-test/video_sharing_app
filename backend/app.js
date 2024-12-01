import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";

//Import Routes
import adminRoute from "./routes/adminRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import videoRoute from "./routes/videoRoute.js";
import userRoute from "./routes/userRoute.js";

const app = express();
app.use(express.json());

app.use(cors());

const PORT = 3000 || process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

app.use("/api/auth", adminRoute);
app.use("/api/category", categoryRoute);
app.use("/api/video", videoRoute);
app.use("/api/user", userRoute);

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("mongodb connected");

    app.listen(PORT, () => {
      console.log("server is runing on port 3000");
    });
  } catch (error) {
    console.log("error in connecting mongodb", error);
  }
}

startServer();
