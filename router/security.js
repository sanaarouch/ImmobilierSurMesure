const express = require("express");
const Joi = require("@hapi/joi"); 
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const _ = require("lodash");

const { schema: schemaSignup } = require("../ressources/signup");
const { User, validation } = require("../ressources/user")

const router = express.Router();

function validationSignin(user) 
{   
    const schemaSignin = Joi.object({        
         password : Joi.string(),     //PasswordComplexity(complexityOptions).required(),        
         email : Joi.string().min(3).max(250).email().required()   
        
    });
    return new Promise((resolve, reject) => {
        const error = schemaSignin.validate(user).error
        console.log(error);
        if (!error) {
            return resolve(user)
        } else {
            return reject(error)
        }
    })
}

/*
** Use to create a new user from signup process (/security/signup)
*/

router.post("/signup", (req, resp) => {
    const {nom , password , email} = req.body;
    console.log(req.body);
    const payload = {        
        nom : nom,        
        password : password,        
        email: email   
    };

    validation(payload)
       .then(async () => {
        const user = await User.findOne({email : email})

        if (user) {
            const message = {
                msg : "Utilisateur déjà enregistré"
            }
            return resp.status(400).send(message)
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = new User({            
            nom : nom,            
            password : hashedPassword,
            email: email        
        });

        try {
            await newUser.save();
            const token = newUser.generateAuthenToken();
            resp.header("x-auth-token", token)                   
                .header("access-control-expose-headers" , "x-auth-token" )                    
                .send({                       
                    user : _.pick(newUser, ["_id", "nom","email"]),
                    token : token                 
                })
        } catch(e) {
            console.log("error", e);
            return resp.status(500).send({msg: e});
        }
    })
});

/*
** Use for user signin (/security/signin)
*/
router.post("/signin", (req, resp) =>{    
    const {password , email} = req.body ;    
    let user = {        
            password : password ,        
            email: email   
    };

    validationSignin(user) 
        .then( async () => {
        user = await User.findOne({ email : email}) ;               
        if (!user) {
            return resp.status(400).send({msg: "email ou password invalide"});    
        }
                 
        const validPassword = password === user.password  //await bcrypt.compare(password , user.password);
            console.log(password, user.password)
            console.log("password", validPassword) 
        if (!validPassword) {
            return resp.status(400).send({msg : "email ou password invalide"});  
        }
        const token = user.generateAuthenToken();         
        resp.header("x-auth-token", token)            
            .header("access-control-expose-headers" , "x-auth-token")            
            .send({                
                data : "Bienvenue, vous êtes connecté !",                 
                token : token              
            });
        })    
        .catch( (err) =>{       
            return resp.status(400).send({msg : err});    
        }); 
    
});


module.exports = router;