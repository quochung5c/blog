const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;
const passport = require("passport");
const multer = require("multer");
const moment = require("moment");

moment.locale("vi");
cloudinary.config({
  cloud_name: "vn-esports",
  api_key: "996178356223912",
  api_secret: "rC8_6QyIf1DIbokVgSYe0VLsJwQ"
});
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
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
  Post.find()
    .exec()
    .then(data => {
      res.status(200).json({ data });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

router.get("/:postId", (req, res) => {
  Post.findById(req.params.postId)
    .exec()
    .then(doc => {
      res.status(200).json({ data: doc });
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
});

router.post(
  "/",
  upload.single("image"),
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    cloudinary.uploader.upload(req.file.path, (err, result) => {
      if (err) return res.status(400).json({ err });
      else {
        const data = new Post({
          title: req.body.title,
          subtitle: req.body.subtitle,
          content: req.body.content,
          author: req.user._id,
          genre: req.body.genre,
          image: result.secure_url
        });
        data.save().then(async response => {
          let userPost = await User.findById(req.user._id);
          userPost.posts.push(response._id);
          await userPost.save();
          res.status(201).json({ response });
        });
      }
    });
  }
);

module.exports = router;
