const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("config");

const routerSecurity = require("./router/security");

const routerUser = require("./router/user");
const routerOrder = require("./router/order");
const routerHouse = require("./router/house");

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(new Date(), req.method, req.path);
    next()
})

/*
** Use only for signin and signup (or resetPassword, ...)
** Manage security purpose
*/
app.use("/security", routerSecurity);

/*
** Ressource section
*/
app.use("/user", routerUser);
app.use("/order", routerOrder);
app.use("/house", routerHouse);


if(!config.get('jwtCleSecrete')) 
{ 
  console.error("FATAL ERROR jwtCleSecrete non définie");    
  process.exit(1);
 }


const urlBdd = "mongodb+srv://ifocop_admin:Projet147@cluster0-dtiq2.mongodb.net/test?retryWrites=true&w=majority";
const optionConnexion = {
    useNewUrlParser : true , 
    useCreateIndex: true ,
    useUnifiedTopology: true ,
    useFindAndModify: true
}

const con = mongoose.connect(urlBdd, optionConnexion)

.then(() => console.log("connected"))
.catch(err => console.log(err));


const port = process.env.PORT || 2200;

app.listen(port, function(){
    console.log("server disponible sur le port" + port)
});