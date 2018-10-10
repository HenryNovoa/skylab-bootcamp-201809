var user;

var landing = new Landing('Choose an option', 'section',
    function(){
        landing.hide();
        register.show();   
},
    function(){
        landing.hide();
        login.show();
    }
);

document.body.appendChild(landing.element); // add to body the element property of landing

//In the register, I want this to heppen
var register = new Register('Register','section',
    function(name,surname,username,password){
        if (!name || !name.trim().length) alert('invalid name');
        else if (!surname || !surname.trim().length) alert('invalid surname');
        else if (!username || !username.trim().length) alert('invalid username');
        else if (!password || !password.trim().length) alert('invalid password');
        else {
            user = {
                name: name,
                surname: surname,
                username: username,
                password: password
            };
    
            register.hide();
            login.show();
        }


    },
    function(){
        register.hide();
        landing.show();
    }
)
document.body.appendChild(register.element);

var login = new Login('Login','section', 
    function(username,password){ //loginCallback
    if(!username || !username.trim().length) alert('invalid username')
    else if(!password || !password.trim().length) alert('invalid password')
    else if(user){
        if(username === user.username && password === user.password){
            login.hide();
            welcome.title.innerText = 'Welcome ' + user.name +'!';
            welcome.show();
        }
        else{
            alert('wrong credentials');
        }
    }


},  function(){     //backCalllback
    login.hide();
    landing.show();
});

document.body.appendChild(login.element);


var welcome = new Welcome('Welcome','section',);

document.body.appendChild(welcome.element);