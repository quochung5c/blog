const express = require("express");
const passport = require("passport");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comments");

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
app.use(passport.initialize());

require("./validator/routes")(passport);

app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/comments", commentRoute);
app.use("/uploads", express.static("uploads"));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
