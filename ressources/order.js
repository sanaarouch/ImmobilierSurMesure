const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const schemaOrder = mongoose.Schema({
    oderVente: [String] ,
    orderAchat : [String] ,
    orderConstruction: [String] ,
    date : {type : Date , default : Date.now} ,
    avance : Number ,
    statut: String ,
    estPublie: Boolean
    
});

const Order = mongoose.model("order", schemaOrder);
const schema = Joi.object({
   
    orderVente: Joi.array().items(Joi.string()).min(3).max(255).required(),
    orderAchat: Joi.array().items(Joi.string()).min(3).max(255).required(),
    orderConstruction: Joi.array().items(Joi.string()).min(3).max(255).required(),
    avance: Joi.number().min(3).max(255),
    statut: Joi.number().min(3).max(255),
    estPublie : Joi.boolean().required()
   
});

module.exports.schema = schema;
module.exports.Order = Order;
