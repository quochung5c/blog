const router = require("express").Router();
const Team = require("../models/Team");
const Player = require("../models/Player");

router.get("/", (req, res) => {
  Team.find()
    .exec()
    .then(data => {
      res.status(200).json({ counts: data.length, data });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});
router.get("/:id", (req, res) => {
  Team.findOne({ _id: req.params.id })
    .exec()
    .then(data => {
      res.status(200).json({ data });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

router.post("/:id/add", async (req, res) => {
  // get id from verified data
  let data = new Team({
    name: req.body.name,
    leader: req.params.id
  });
  data
    .save()
    .then(response => {
      res.status(201).json({ response });
    })
    .catch(error => res.status(400).json({ error }));
});

router.patch("/:teamId/add", async (req, res) => {
  let isValid = await Team.findOne({ _id: req.params.teamId });
  if (!isValid) {
    return res.status(404).json({ error: "Not found" });
  }
  if (isValid.players.length === 6)
    return res.status(301).json({ quantity: "Full" });

  Team.updateOne(
    { _id: req.params.teamId },
    { $push: { players: req.body.playerId } }
  )
    .exec()
    .then(response => {
      res.status(201).json({
        response
      });
    })
    .catch(error => {
      res.status(400).json({
        error
      });
    });
});

router.patch("/:teamId/remove", async (req, res) => {
  let isValid = await Team.findOne({ _id: req.params.teamId });
  if (!isValid) {
    return res.status(404).json({ error: "Not found" });
  }
  Team.updateOne(
    { _id: req.params.teamId },
    { $pull: { players: req.body.playerId } }
  )
    .exec()
    .then(response => {
      res.status(201).json({
        response
      });
    })
    .catch(error => {
      res.status(400).json({
        error
      });
    });
});

router.delete("/:teamId", async (req, res) => {
  let isValid = await Team.findOne({ _id: req.params.teamId });
  if (!isValid) return res.status(301).json({ message: "Not found!" });
  if (isValid.leader !== req.body.playerId)
    return res.status(403).json({ error: "Unauthorized" });
  Team.deleteOne({ _id: req.params.teamId })
    .exec()
    .then(response => {
      res.status(201).json({ response });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

module.exports = router;

/* 
1. Chỉ có thằng lead mới thêm vào đc
2. Cả lead và mem có thể kick/out.
*/
