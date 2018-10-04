// safe-box.js

var safeBox = {
    
    

    saveSecret: function(secret, password) {
        
       this.safeSecret(secret);
       this.savePassword(password); 
    },

    retrieveSecret: function(password) {
      
        if(password === savedPassword){
        this.retrieve = function getSecret() { return sec; }
        }
        else{throw Error("Incorrect password")};


    },

    safeSecret: function(secret){
            var savedSecret = secret;
    },
    
    savePassword(password){
           var savedPassword = password;
    }




}