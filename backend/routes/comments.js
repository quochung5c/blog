const router = require("express").Router();
const Comment = require("../models/Comment");
const moment = require("moment");

moment.locale("vi");

router.get("/", (req, res) => {
  Comment.find()
    .exec()
    .then(doc => {
      res.status(200).json({
        counts: doc.length,
        data: doc
      });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

router.get("/:commentId", (req, res) => {
  Comment.findOne({ _id: req.params.commentId })
    .exec()
    .then(data => {
      res.status(200).json({ data });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

module.exports = router;
