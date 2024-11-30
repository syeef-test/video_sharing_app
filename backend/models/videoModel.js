import mongoose from "mongoose";

const videoSchema = mongoose.Schema(
  {
    category: {
      type: [String],
      default: [],
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    videoLink: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default Video = mongoose.model("Video", videoSchema);
