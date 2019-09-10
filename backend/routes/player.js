const router = require("express").Router();
const Player = require("../models/Player");
// const Joi = require('joi');
const Joi = require("@hapi/joi");

router.get("/", (req, res) => {
  Player.find()
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

router.post("/login", (req, res) => {
  Player.findOne({
    secretCode: req.body.secretCode,
    phoneNumber: req.body.phoneNumber
  })
    .exec()
    .then(data => {
      res.status(200).json({
        message: "OK",
        secret_code: req.body.secretCode,
        data
      });
    })
    .catch(err => {
      res.status(400).json({
        message: "Errror"
      });
    });
});

function validateCode(data) {
  const schema = {
    code: Joi.string()
      .min(6)
      .max(20)
      .required()
      .token(),
    facebook: Joi.string()
      .uri()
      .required()
  };
  return Joi.validate(data, schema);
}

router.post("/add", (req, res) => {
  let validator = {
    code: req.body.code,
    facebook: req.body.facebook
  };
  if (validateCode(validator).error !== null) {
    res.status(400).json({
      message: validateCode(validator).error.details[0].message
    });
  }
  let data = new Player({
    ingame: req.body.ingame,
    rank: req.body.rank,
    role: req.body.role,
    phoneNumber: req.body.phoneNumber,
    facebook: req.body.facebook,
    secretCode: req.body.code,
    school: req.body.school
  });
  data
    .save()
    .then(response => {
      res.status(200).json({ response });
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
});

router.post("/testUrl", (req, res) => {
  let schema = Joi.string().uri();
  let result = Joi.validate(req.body.url, schema);
  res.status(200).json({
    result
  });
});

router.delete("/:id", (req, res) => {
  Player.deleteOne({ _id: req.params.id }, error => {
    if (error) return res.status(400).json({ error });
    else return res.status(200).json({ message: "Deleted!" });
  });
});

module.exports = router;
