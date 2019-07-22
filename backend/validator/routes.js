const jwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");
const option = {};

option.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
option.secretOrKey = "s3cr3t";

module.exports = passport => {
  passport.use(
    new jwtStrategy(option, (payload, done) => {
      User.findOne({ _id: payload._id }, (err, user) => {
        if (err) {
          return done(err, false);
        } else {
          return done(null, user);
        }
      });
    })
  );
};
