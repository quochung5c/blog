const router = require("express").Router();
const Post = require("../models/Post");
const Comments = require("../models/Comment");
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
    .populate("author", "username avatar")
    .exec()
    .then(data => {
      res.status(200).json({
        counts: data.length,
        data
      });
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

router.delete(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let postExist = await Post.findOne({ _id: req.params.postId });
    if (!postExist) return res.status(404).json({ post: "Not found" });
    Post.deleteOne({ _id: req.params.postId })
      .then(async response => {
        let userPost = await User.findOne({ _id: req.user._id });
        let newUserPost = userPost.posts.filter(post => {
          return post !== req.params.postId;
        });
        userPost.posts = newUserPost;
        await userPost.save();
        res.status(200).json({ response });
      })
      .catch(err => res.status(400).json({ error: err }));
  }
);

router.patch(
  "/:postId/edit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.updateOne({ _id: req.params.postId }, req.body)
      .then(response => {
        res.status(200).json({
          response
        });
      })
      .catch(error => res.status(400).json({ error }));
  }
);

router.patch(
  "/:postId/likes",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let postExist = await Post.findOne({ _id: req.params.postId });
    if (!postExist) return res.status(404).json({ post: "Not found!" });
    else {
      let compareLike = postExist.likes.some(item => {
        return item == req.user._id;
      });
      if (compareLike)
        res.status(400).json({ message: "User has liked the post!" });
      else {
        Post.updateOne(
          { _id: req.params.postId },
          { $addToSet: { likes: req.user._id } }
        )
          .then(response => {
            res.status(200).json({ response });
          })
          .catch(error => res.status(400).json({ error }));
      }
    }
  }
);

router.patch(
  "/:postId/image",
  upload.single("image"),
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let postExist = await Post.findOne({ _id: req.params.postId });
    if (!postExist) return res.status(404).json({ post: "Not found!" });
    cloudinary.uploader.upload(req.file.path).then(result => {
      Post.updateOne({ _id: req.params.postId }, { image: result.secure_url })
        .then(response => {
          res.status(200).json({ response });
        })
        .catch(error => res.status(400).json({ error }));
    });
  }
);
/* Comments */
router.post(
  "/:postId/comments",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let postExist = await Post.findOne(req.params.postId);
    if (!postExist) return res.status(404).json({ post: "Not found!" });
    let data = new Comment({
      author: req.user._id,
      post: req.params.postId,
      content: req.body.content
    });
    data
      .save()
      .then(async response => {
        postExist.comments.push(response._id);
        await postExist.save();
        res.status(201).json({ response });
      })
      .catch(error => {
        res.status(400).json({ error });
      });
  }
);

router.patch(
  "/:postId/edit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {}
);
module.exports = router;
