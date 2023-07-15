const mongoose = require("mongoose");
const validator = require("validator"); // validator package to facilitate validation of emails and passwords
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const VideoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  videos: [{ type: String, required: [true, "video is required"] }],

  course: {
    type: mongoose.Schema.ObjectId,
    ref: "Courses",
    required: [true, "Video must be belong to Specific Course"],
  },

  //______________________________________________________________________________

  // filePath: {
  //   type: String,
  // },
  // createdAt: {
  //   type: Date,
  // },
  // // minutes: {
  // //   type: Integer,
  // // },
  // // seconds: {
  // //   type: Integer,
  // // },
  // // hours: {
  // //   type: Integer,
  // // },
  // title: {
  //   type: String,
  // },
  // description: {
  //   type: String,
  // },
  // thumbnail: {},
  // category: {},
});
const Video = mongoose.model("Video", VideoSchema);
module.exports = Video;
