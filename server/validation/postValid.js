const Joi = require("@hapi/joi");

const postValidation = (data) => {

  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    date: Joi.string().required(),
    image: Joi.string().required(),
    user:Joi.string().required(),
    comments:Joi.string(),


  });

  return schema.validate(data);
};


const updateValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    image: Joi.string().required(),
  });

  return schema.validate(data);
};



module.exports.postValidation = postValidation;
module.exports.updateValidation = updateValidation;

