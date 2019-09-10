const Joi = require("@hapi/joi");
// const Joi = require("joi");

function validateURL(url) {
  const schema = {
    ur: Joi.string().uri()
  };
  return Joi.validate(url, schema);
}

console.log(validateURL('abc'))
