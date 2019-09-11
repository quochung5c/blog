const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema(
  {
    name: String,
    leader: {
      type: Schema.Types.ObjectId,
      ref: "Player"
    },
    players: [
      {
        type: Schema.Types.ObjectId,
        ref: "Player"
      }
    ]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model("Team", teamSchema);
