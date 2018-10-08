var landing = new Landing('Choose an option', 'section',
    function() {
       landing.hide();
       register.show()
    },
    function() {
        landing.hide();
        login.show();
    });

document.body.appendChild(landing.element);

var login = new Login('Login', 'section',
    function(){
        
        login.hide();
        welcome.show();
    });

document.body.appendChild(login.element);

var register = new Register('Register','section',
function(){
            //landing.hide();
            register.hide();
            login.show();    

});

document.body.appendChild(register.element);

var welcome = new Welcome ('Welcome','Section',function(){

    
    register.hide();
    welcome.show();
});

document.body.appendChild(welcome.element);
