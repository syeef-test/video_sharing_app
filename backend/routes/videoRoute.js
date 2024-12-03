import express from "express";
import {
  addVideo,
  getVideo,
  updateVideo,
  deleteVideo,
} from "../controllers/videoController.js";

import authenticate from "../middleware/auth.js";

//file upload
import multer from "multer";
//const upload = multer({ dest: "uploads/" });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const newFileName = `${Date.now()}_${file.originalname}`;
    cb(null, newFileName);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/addVideo", authenticate, upload.single("video"), addVideo);
router.get("/getVideo", authenticate, getVideo);
router.put("/updateVideo/:videoId", authenticate, updateVideo);
router.delete("/deleteVideo/:videoId", authenticate, deleteVideo);

export default router;
