const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { registerAuth, loginAuth } = require("../validator/auth");

router.post("/register", async (req, res) => {
  // Check email exist
  let emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).json({ email: "Email exist!" });
  if (registerAuth(req.body).error === null) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      const data = new User({
        username: req.body.username,
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
      res.status(200).json({
        result,
        message: "Logged in!",
        user: {
          email: emailExist.email,
          username: emailExist.username
        }
      });
    }
  });
});

module.exports = router;
