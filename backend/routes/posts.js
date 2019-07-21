const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const { cloudinaryKey, storageSetting } = require("../config/config");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const moment = require("moment");

moment.locale("vi");
cloudinary.config({ cloudinaryKey });
const storage = multer.diskStorage({
  storageSetting
});
const filterUpload = function(req, file, cb) {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "video/webm" ||
    file.mimetype === "video/mp4"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  fileFilter: filterUpload,
  limits: 1024 * 1024 * 25
});

router.get("/", (req, res) => {
  Post.find().exec(error, doc => {
    if (error) return res.status(400).json({ error });
    else {
      res.status(200).json({
        counts: doc.length,
        data: doc
      });
    }
  });
});

router.get("/:id", (req, res) => {
  Post.findOne({ _id: req.params.id }).exec(error, doc => {
    if (error) return res.status(400).json({ error });
    else {
      res.status(200).json({
        data: doc
      });
    }
  });
});

router.post("/", upload.single('image'), async (req, res) => {
     
});

module.exports = router;
