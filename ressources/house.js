const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const schemaHouse = mongoose.Schema({
    liste: [String] ,
    id : Number ,
    prix: Number,
    tempsConstruction: Number,
    nombrePiece: Number,
    nombreEtage: Number,
    surface: Number,
    estPublie: Boolean
});

const House = mongoose.model("house", schemaHouse);
const schema = Joi.object({

    liste : Joi.array().items(Joi.string()).min(3).max(255).required(),
    id : Joi.number().min(3).max(255),
    prix: Joi.number().min(3).max(255),
    tempsConstruction: Joi.number().min(3).max(255),
    nombrePiece: Joi.number().min(3).max(255),
    nombreEtage: Joi.number().min(3).max(255),
    surface: Joi.number().min(3).max(255),
    estPublie : Joi.boolean().required()

});

module.exports.schema = schema;
module.exports.House = House;