import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

app.use(cors());

const PORT = 3000 || process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

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
