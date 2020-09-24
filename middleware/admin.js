const msg = {
     noAuthorisation :"Ressource non authorisée",
}

function admin(req, resp, next) {  
       
     if (!req.user.isAdmin) {
          return resp.status(401).send(msg.noAuthorisation)  
     }
     next();
}
module.exports = admin ;
