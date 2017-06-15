const Joi = require(`joi`);

const schema = {
  date: {
    type: String,
    required: true,
    validation: Joi.string()
  },

  image: {
    type: String,
    required: true,
    validation: Joi.any()
  },

  isSet: {
    type: Boolean,
    required: true,
    validation: Joi.bool()
  }
};

module.exports = {
  schema
};
