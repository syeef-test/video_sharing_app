import Video from "../models/videoModel.js";

export const addVideo = async (req, res, next) => {
  try {
    if (
      !req.body.title ||
      !req.body.description ||
      !req.body.videoLink ||
      !req.body.categoryId
    ) {
      res.status(400).send({ message: "Send All Required Fields" });
    }

    const newVideo = {
      title: req.body.title,
      description: req.body.description,
      videoLink: req.body.videoLink,
      category: req.body.categoryId,
    };

    const videoResponse = await Video.create(newVideo);

    if (!videoResponse) {
      return res.status(500).send({ message: "Failed To Create Video" });
    }

    return res.status(200).send(videoResponse);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const getVideo = async (req, res, next) => {};

export const updateVideo = async (req, res, next) => {};

export const deleteVideo = async (req, res, next) => {};
