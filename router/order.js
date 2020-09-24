const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();


const { Order , schema } = require("../ressources/order");

router.get("/", async function(req, res){
    const resultat = await Order.find() ; 
    res.send(resultat);
});

router.post("/", async function(req, res){
    const body = req.body;
  
    const verif = schema.validate(body);
    if(verif.error){
    res.status(400).send(verif.error.details[0].message);
    return ;
    }

   const order = new Order(body);
   const resultat = await order.save(); 
   res.send(resultat);
});

router.delete("/:id", async function(req, res){
    const id = req.params.id ;
    const verifID = mongoose.Types.ObjectId.isValid(id);
    if(!verifID){
        res.status(400).send("l'id transmis n'est pas conforme");
        return ;
    }
    const resultat = await Orders.deleteOne({ _id : id});
    
    if(resultat.deletedCount === 0){
        res.status(404).send("il n'existe pas d'enregistrement avec l'id" + id);
        return ;
    }
 
    const reponse = await Order.find();
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
    const resultat = await Orders.findById(id);
        if(!resultat){
        res.status(404).send("aucun enregistrement trouvé pour l'id "+ id);
        return ;
    }

    resultat.orderVente = body.orderVente;
    resultat.orderAchat = body.orderAchat;
    resultat.orderConstruction = body.orderConstruction;
    resultat.date= body.date;
    resultat.avance = body.avance;
    resultat.statut = body.statut;
    resultat.estPublie = body.estPublie;

    const reponse = await resultat.save();

    res.send(reponse);

});

module.exports = router;