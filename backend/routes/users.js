const router = require("express").Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const User = require("../models/User");
const { registerAuth, loginAuth } = require("../validator/auth");

router.get("/", (req, res) => {
  User.find()
    .exec()
    .then(doc => {
      res.status(200).json({
        counts: doc.length,
        data: doc
      });
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
});

router.post("/register", async (req, res) => {
  // Check email exist
  let emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).json({ email: "Email exist!" });
  if (registerAuth(req.body).error === null) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      const avatar = gravatar.url(req.body.email, {
        s: 180,
        d: "mm",
        r: "pg",
        protocol: "http"
      });
      const data = new User({
        username: req.body.username,
        avatar,
        password: hash,
        email: req.body.email
      });
      data.save((error, result) => {
        if (error) return res.status(400).json({ error });
        else {
          return res.status(201).json({ result });
        }
      });
    });
  } else {
    return res
      .status(403)
      .json({ error: registerAuth(req.body).error.details[0].message });
  }
});

// Login
router.post("/login", async (req, res) => {
  // email exist
  let emailExist = await User.findOne({ email: req.body.email });
  if (!emailExist) return res.status(400).json({ email: "User not found!" });
  if (loginAuth(req.body).error !== null) {
    res.status(400).json({
      error: loginAuth(req.body).error.details[0].message
    });
  }
  bcrypt.compare(req.body.password, emailExist.password, (err, result) => {
    if (err) res.status(403).json({ password: "Failed to authenticate" });
    else {
      jwt.sign(
        {
          _id: emailExist._id,
          email: emailExist.email,
          avatar: emailExist.avatar
        },
        "s3cr3t",
        { expiresIn: "1d" },
        (err, encoded) => {
          if (err) res.status(400).json({ error: err });
          else {
            res
              .status(200)
              .json({ message: "Success", token: `Bearer ${encoded}` });
          }
        }
      );
    }
  });
});

router.delete(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user._id !== req.params.userId)
      return res.status(403).json({ user: "Unauthorized!" });
    User.deleteOne(req.params.userId).then(response => {
      res
        .status(200)
        .json({
          response
        })
        .catch(error => {
          res.status(400).json({ error });
        });
    });
  }
);

module.exports = router;
