const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const config = require("config");
const jwt = require("jsonwebtoken"); 

//const PasswordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    nom :{
        type:String,        
        minlength: 3,        
        maxlength : 250 ,       
        required : true   
    },    
    password : {        
        type:String,        
        minlength: 3,        
        maxlength : 24,        
        required : true    
    },   
     email : {        
        type:String,        
        minlength: 3,        
        maxlength : 250,        
        required : true ,        
        unique : true    
    },    
    isAdmin : {        
        type :Number,       
        default : false,        
        required : true    
    }

});
userSchema.methods.generateAuthenToken = function() 
{    
    const payload = {       
        _id : this._id,        
        isAdmin : this.isAdmin   
    }    
    const token = jwt.sign(
        payload,
        config.get("jwtCleSecrete")
    );    
    return token;
}

const User = mongoose.model("user", userSchema);

function validationUser(user) {
        const complexityOptions = {        
            min: 5,        
            max: 250,        
            lowerCase: 1,        
            upperCase: 1,        
            numeric: 1,        
            symbol: 1,       
            requirementCount: 6   
        };    
        const schema = Joi.object({        
             nom : Joi.string().min(3).max(250).required(),        
             password : Joi.string().required(),        //PasswordComplexity(complexityOptions)
             email : Joi.string().min(3).max(250).email().required(),        
             idAdmin : Joi.number()   
        })

        //return Joi.validate(user, schema); 
        return new Promise((resolve, reject) => {
            const error = schema.validate(user).error
            console.log(error);
            if (!error) {
                return resolve(user)
            } else {
                return reject(error)
            }
        })
}


module.exports.User = User;
module.exports.validation = validationUser ;
