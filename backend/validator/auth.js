const Joi = require("@hapi/joi");

module.exports.registerAuth = data => {
  let schema = Joi.object({
    username: Joi.string()
      .required()
      .min(6)
      .max(30),
    password: Joi.string()
      .token()
      .required()
      .min(6)
      .max(20),
    email: Joi.string()
      .required()
      .email()
  });
  return Joi.validate(data, schema);
};
module.exports.loginAuth = data => {
  let schema = Joi.object({
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .token()
      .required()
      .min(6)
      .max(20)
  });
  return Joi.validate(data, schema);
};
