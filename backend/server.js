const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const playerRoute = require("./routes/player");
const teamRoute = require("./routes/teams");
const port = process.env.PORT || 8080;
require("dotenv").config();

mongoose.connect(
  `mongodb+srv://quochung5c:quochung5c@cluster0-4veva.gcp.mongodb.net/fc2019?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  },
  () => {
    console.log("Connect to database");
  }
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/finder", playerRoute);
app.use("/team", teamRoute);


app.listen(port, () => console.log(`Listening on port ${port}`));
