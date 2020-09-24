const bcrypt = require("bcrypt");
async function generateSalt() {   
const salt = await bcrypt.genSalt(10) ;    
console.log(salt); 
}
generateSalt();

async function generateMotDePassHashe(password) {
    if(typeof password !== 'string'){      
        console.error("le mot de passe doit être de type string");      
        return ;   
    }     
     const salt = await bcrypt.genSalt(10);    
     const hashedPassword = await bcrypt.hash(password,salt);    
     console.log(salt);    
     console.log(hashedPassword); 
}
generateMotDePassHashe("12345");

async function verifPassword(passwordSoumis) {   
     if(typeof passwordHache !== 'string') {     
        console.error("le mot de passe doit être de type string");      
        return ;    
    }    
    const salt = await bcrypt.genSalt(10) ;    
    const hashedPasswordStockee = await bcrypt.hash("12345",salt);    
    const verif = await bcrypt.compare(                                 
         passwordSoumis ,                                   
         hashedPasswordStockee                                
    );    
    console.log(verif);
}
verifPassword("12345")


