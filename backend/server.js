const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/users");

mongoose.connect(
  "mongodb://localhost:27017/blog",
  {
    useNewUrlParser: true,
    useCreateIndex: true
  },
  () => console.log("Connect to database")
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/users", userRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
