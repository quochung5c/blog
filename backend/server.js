const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const playerRoute = require("./routes/player");

const port = process.env.PORT || 8080;

mongoose.connect(
  "mongodb://localhost:27017/fc2019",
  {
    useNewUrlParser: true,
    useCreateIndex: true
  },
  () => {
    console.log("Connect to database");
  }
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/finder", playerRoute);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
