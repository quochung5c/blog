module.exports = {
  cloudinaryKey: {
    cloud_name: "vn-esports",
    api_key: "996178356223912",
    api_secret: "rC8_6QyIf1DIbokVgSYe0VLsJwQ"
  },
  storageSetting: {
    destination: function(req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + file.originalname);
    }
  },
  
};
