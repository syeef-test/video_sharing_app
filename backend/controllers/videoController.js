import Video from "../models/videoModel.js";
import fs from "fs";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const addVideo = async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.description || !req.body.categoryId) {
      res.status(400).send({ message: "Send All Required Fields" });
    }

    if (!req.file) {
      res.status(400).send({ message: "File Required" });
    }

    const filePath = req.file.path;
    console.log(filePath);

    const cloudServerUpload = await uploadOnCloudinary(filePath);
    //console.log("cloud", cloudServerUpload);
    console.log("secure_urll", cloudServerUpload.secure_url);

    const newVideo = {
      title: req.body.title,
      description: req.body.description,
      videoLink: cloudServerUpload.secure_url,
      category: req.body.categoryId,
    };

    const videoResponse = await Video.create(newVideo);

    //not req allready deleted file;
    // if (cloudServerUpload) {
    //   fs.unlinkSync(filePath);
    // }

    if (!videoResponse) {
      return res.status(500).send({ message: "Failed To Create Video" });
    }

    return res.status(200).send(videoResponse);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const videoDetails = await Video.find({ status: true });
    if (videoDetails.length > 0) {
      return res
        .status(200)
        .json({ message: "Video Data Found", data: videoDetails });
    } else {
      return res.status(200).send({ message: "No Video Data Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const videoId = req.params.videoId;

    if (!req.body.title || !req.body.description || !req.body.categoryId) {
      res.status(400).send({ message: "Send All Required Fields" });
    }

    if (!videoId) {
      res.status(400).send({ message: "Send Video Id" });
    }

    const updateVideo = await Video.findByIdAndUpdate(
      videoId,
      {
        title: req.body.title,
        description: req.body.description,
        videoLink: req.body.videoLink,
        category: req.body.categoryId,
      },
      { new: true }
    );

    if (!updateVideo) {
      return res.status(404).send({ message: "Video Not Found" });
    }

    return res
      .status(200)
      .send({ message: "Video Updated", data: updateVideo });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const videoId = req.params.videoId;
    if (!videoId) {
      res.status(400).send({ message: "Send Video Id" });
    }

    const deleteVideo = await Video.findByIdAndUpdate(
      videoId,
      { status: false },
      { new: true }
    );

    // console.log(deleteVideo);

    if (!deleteVideo) {
      return res.status(404).send({ message: "Video Not Found" });
    }

    return res.status(200).send({
      message: "Video Deleted Succesfully",
      data: deleteVideo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};
