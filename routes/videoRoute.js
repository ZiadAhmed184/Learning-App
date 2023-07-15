const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const {
  getVideoValidator,
  creatVideoValidator,
  UpdateVideoValidator,
  DeleteVideoValidator,
} = require("../utils/Validattors/videoValidator");
const {
  create,
  getAll,
  updatevideo,
  deletevideo,
  getvideo,
  creaeFilterObject,
} = require("../controllers/videoController");
const authController = require("../controllers/authController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("multer")) {
      fs.mkdirSync("multer");
    }

    if (!fs.existsSync("multer/videos")) {
      fs.mkdirSync("multer/videos");
    }
    //callback  (null-> error)
    cb(null, "multer/videos");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);

    if (ext !== ".mkv" && ext !== ".mp4" && ext !== ".mp3") {
      return cb(new Error("Only videos are allowed!"));
    }

    cb(null, true);
  },
});

//mergeParams: allow us to access params on other routers
//We need to access trackId from trackRouter
const router = express.Router({ mergeParams: true });

//get all media
// router.get("/admin/allVideo", getAll);

// router.get("/allVideo", getAll);

//get all videos for specific course when add objectFilter in url such as http://localhost:8000/showCourses/:courseId/allVideo
router.get("/", creaeFilterObject, getAll);

//post create new media
router.post(
  "/admin/createVideo",
  upload.fields([
    {
      name: "videos",
      maxCount: 5,
    },
  ]),
  authController.protect,
  authController.allowedTo("admin"),
  creatVideoValidator,
  create
);
router
  .route("/allVideo/:id")
  .get(
    getVideoValidator,
    authController.protect,
    // authController.allowedTo("admin", "user"),
    getvideo
  )
  .put(
    UpdateVideoValidator,
    authController.protect,
    authController.allowedTo("admin"),
    updatevideo
  )
  .delete(
    DeleteVideoValidator,
    authController.protect,
    authController.allowedTo("admin"),
    deletevideo
  );

module.exports = router;
