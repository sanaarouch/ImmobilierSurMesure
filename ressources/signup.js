const Joi = require("@hapi/joi");

const schema = Joi.object({
    nom : Joi.string().min(3).max(255).required(),
    prenom : Joi.string().min(3).max(255).required(),
    email : Joi.string().email().required(),
    password : Joi.string().min(3).max(255).required(),
    estActif : Joi.boolean().required()
})

module.exports.schema = schema;
