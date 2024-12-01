import express from "express";
import {
  addVideo,
  getVideo,
  updateVideo,
  deleteVideo,
} from "../controllers/videoController.js";

import authenticate from "../middleware/auth.js";

const router = express.Router();

router.post("/addVideo", addVideo);
router.get("/getVideo", getVideo);
router.put("/updateVideo/:videoId", updateVideo);
router.delete("/deleteVideo/:videoId", deleteVideo);

export default router;
