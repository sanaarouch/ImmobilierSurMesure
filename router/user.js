const auth = require("../middleware/authorisation"); 
const bcrypt = require("bcrypt"); 
const _ = require("lodash"); 
const mongoose = require("mongoose"); 
const {validation , User} = require("../ressources/user"); 
const express = require("express");
const router = express.Router();

router.get("/me", auth , async(req, resp) =>{   
    const user =  await User.findById(req.user._id  ).select("-password");  
        resp.send(user); 

});

router.delete("/:id", async function(req, res){
    const id = req.params.id ;
    const verifID = mongoose.Types.ObjectId.isValid(id);
    if(!verifID){
        res.status(400).send("l'id transmis n'est pas conforme");
        return ;
    }
    const resultat = await User.deleteOne({ _id : id});
   
    if(resultat.deletedCount === 0){
        res.status(404).send("il n'existe pas d'enregistrement avec l'id" + id);
        return ;
    }
    const reponse = await User.find();
    res.send(reponse);
})

router.get("/", async function(req, res){
    const resultat = await User.find() ; 
    res.send(resultat);
});
router.get("/:id", async function(req, res){
    const id = req.params.id;
    const verifID = mongoose.Types.ObjectId.isValid(id);
    if(!verifID){
        res.status(400).send("id donné n'est pas conforme");
        return ;
    }
   const resultat = await User.find({_id : id}); 
    if(resultat.length === 0){
        res.status(404).send("aucun enregistrement avec l'id "+ id);
        return ;
    }
    res.send(resultat);
});

module.exports = router;