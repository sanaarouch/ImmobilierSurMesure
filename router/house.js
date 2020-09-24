const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const { House , schema} = require("../ressources/house");

router.get("/", async function(req, res){
    const resultat = await House.find() ; 
    res.send(resultat);
});

router.get("/:id", async function(req, res){
    const id = req.params.id;
    const verifID = mongoose.Types.ObjectId.isValid(id);
    if(!verifID){
        res.status(400).send("id donné n'est pas conforme");
        return ;
    }
    const resultat = await House.find({_id : id}); 
    if(resultat.length === 0){
        res.status(404).send("aucun enregistrement avec l'id "+ id);
        return ;
    }
    res.send(resultat);
});

router.post("/", async function(req, res){
    const body = req.body;
  
    const verif = schema.validate(body);
    if(verif.error){
        res.status(400).send(verif.error.details[0].message);
    return ;
    }

    const house = new House(body);
    const resultat = await house.save(); 
    res.send(resultat);
});

router.delete("/:id", async function(req, res){
    const id = req.params.id ;
    const verifID = mongoose.Types.ObjectId.isValid(id);
    if(!verifID){
        res.status(400).send("l'id transmis n'est pas conforme");
        return ;
    }
    const resultat = await Houses.deleteOne({ _id : id});
    
    if(resultat.deletedCount === 0){
        res.status(404).send("il n'existe pas d'enregistrement avec l'id" + id);
        return ;
    }
 
    const reponse = await House.find();
    res.send(reponse);
 })

 router.put("/:id", async function(req,res){
    const id = req.params.id ;
    const verifID = mongoose.Types.ObjectId.isValid(id);
    if(!verifID){               
        res.status(400).send("id non conforme !");
        return ;
    }
    const body = req.body ;
    const verif = schema.validate(body); 
    if(verif.error){
        res.status(400).send(verif.error.details[0].message);
        return;
    }
    const resultat = await Houses.findById(id);
    if(!resultat){
        res.status(404).send("aucun enregistrement trouvé pour l'id "+ id);
        return ;
    }

    resultat.liste = body.liste;
    resultat.id = body.id;
    resultat.prix = body.prix;
    resultat.tempsConstruction = body.tempsConstruction;
    resultat.nombrePiece = body.nombrePiece;
    resultat.nombreEtage = body.nombreEtage;
    resultat.surface = body.surface;
    resultat.estPublie = body.estPublie;

    const reponse = await resultat.save();

    res.send(reponse);

});

module.exports = router;