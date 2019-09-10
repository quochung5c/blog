const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const playerSchema = new Schema({
  ingame: {
    type: String,
    unique: true
  },
  rank: {
    type: String,
    required: true,
    enum: [
      "Sắt",
      "Đồng",
      "Bạc",
      "Vàng",
      "Bạch kim",
      "Kim cương",
      "Cao thủ",
      "Thách đấu"
    ]
  },
  role: {
    type: String,
    enum: ["Top", "Jungle", "Mid", "Ad Carry", "Support"]
  },
  school: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    trim: true,
    unique: true
  },
  facebook: {
    type: String,
    trim: true,
    unique: true
  },
  status: {
    type: Boolean,
    default: false
  },
  secretCode: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Player", playerSchema);
