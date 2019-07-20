const router = require('express').Router();
const Post = require('../models/Post');
const User = require('.')
// moment.locale("vi");
// cloudinary.config({
//   cloud_name: "vn-esports",
//   api_key: "996178356223912",
//   api_secret: "rC8_6QyIf1DIbokVgSYe0VLsJwQ"
// });

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function(req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   }
// });
// const filterUpload = function(req, file, cb) {
//   if (
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/png" ||
//     file.mimetype === "video/webm" ||
//     file.mimetype === "video/mp4"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };
// const upload = multer({
//   storage: storage,
//   fileFilter: filterUpload,
//   limits: 1024 * 1024 * 25
// });