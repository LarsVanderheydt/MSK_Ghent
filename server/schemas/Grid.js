const Joi = require(`joi`);

const schema = {
  gridName: {
    type: String,
    required: true,
    validation: Joi.string()
  },

  forPainting: {
    type: String,
    required: true,
    validation: Joi.string()
  },

  id: {
    type: String,
    required: true,
    validation: Joi.string()
  }
};

module.exports = {
  schema
};
