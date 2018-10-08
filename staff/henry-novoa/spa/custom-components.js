function Landing(title, tag, registerCallback, loginCallback) {
    Panel.call(this, title, tag);

    this.register = document.createElement('button');
    this.register.innerText = 'Register';
    this.register.addEventListener('click', registerCallback);
    this.element.appendChild(this.register);


    this.element.appendChild(document.createTextNode(' or '));

    this.login = document.createElement('button');
    this.login.innerText = 'Login';
    this.login.addEventListener('click', loginCallback);
    this.element.appendChild(this.login);


}

Landing.prototype = Object.create(Panel.prototype);
Landing.prototype.constructor = Landing;

function Login(title, tag, welcomeCallback) {
    Panel.call(this, title, tag);

    this.element.style.display = 'none';


    this.form = document.createElement('form');
    this.element.appendChild(this.form);


    this.username = document.createElement('input');
    this.form.appendChild(this.username);
    this.username.value='username';
    this.username.name='henry';
    

    this.password = document.createElement('input');
    this.form.appendChild(this.password);
    this.password.value='password';
    this.username.name='12345';



    this.login = document.createElement('button');
    this.login.addEventListener('click', welcomeCallback);
    this.login.innerText = 'Login';
    this.form.appendChild(this.login);
    
 
  
}

Login.prototype = Object.create(Panel.prototype);
Login.prototype.constructor = Login;

function Register(title,tag, registerCallback){

    Panel.call(this, title, tag);

    this.element.style.display = 'none';


    this.form = document.createElement('form');
    this.element.appendChild(this.form);
    


    this.username = document.createElement('input');
    this.form.appendChild(this.username);
    this.username.name= '_name';
    this.username.value ='username';

    this.password = document.createElement('input');
    this.form.appendChild(this.password);
    this.password.name='_password';
    this.password.value='password';
    
    this.repeatPassword = document.createElement('input');
    this.form.appendChild(this.repeatPassword);
    this.password.name='_repeatPassword';
    this.repeatPassword.value='repeat password';
    
    
    //Register button
    this.register = document.createElement('button');
    this.register.addEventListener('click', registerCallback);
    this.form.appendChild(this.register);
    this.register.innerText = 'Confirm';
   
    




}


Register.prototype = Object.create(Panel.prototype);
Register.prototype.constructor = Register;
// TODO Register & Welcome

function Welcome(title, tag) {
    Panel.call(this, title, tag);

    this.element.style.display = 'none';

    this.welcome =document.createElement('p');
    this.welcome.innerText = 'fuckyou';

    this.element.appendChild(this.welcome);

}

Welcome.prototype = Object.create(Panel.prototype);
Welcome.prototype.constructor = Welcome;