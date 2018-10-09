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
    this.username.placeholder = "Username";
    this.form.appendChild(this.username);
    this.password = document.createElement('input');
    this.password.placeholder = "Password";
    this.form.appendChild(this.password);
    this.login = document.createElement('button');
    this.login.innerText = 'Login';
    this.login.type='button';
    this.login.addEventListener('click', welcomeCallback);
    this.form.appendChild(this.login);
}
Login.prototype = Object.create(Panel.prototype);
Login.prototype.constructor = Login;
function Register(title, tag, welcomeCallback) {
    Panel.call(this, title, tag);
    this.element.style.display = 'none';
    this.form = document.createElement('form');
    this.element.appendChild(this.form);
   
    this.label = document.createElement('label');
    this.label.innerText = "username";
    this.form.appendChild(this.label);
    this.email = document.createElement('input');
    this.form.appendChild(this.email);
    this.br = document.createElement('br');
    
    this.form.appendChild(this.br);
    this.br = document.createElement('br');
    
    this.form.appendChild(this.br);
    this.label = document.createElement('label');
    this.label.innerText = "Password";
    this.form.appendChild(this.label);
    this.passord = document.createElement('input');
    this.form.appendChild(this.passord);
    this.br = document.createElement('br');
    
    this.form.appendChild(this.br);
    this.br = document.createElement('br');
    
    this.form.appendChild(this.br);
    this.label = document.createElement('label');
    this.label.innerText = "Confirm password";
    this.form.appendChild(this.label);
    this.confirmPass = document.createElement('input');
    this.form.appendChild(this.confirmPass);
    this.br = document.createElement('br');
    
    this.form.appendChild(this.br);
    this.br = document.createElement('br');
    
    this.form.appendChild(this.br);
    
    this.br = document.createElement('br');
    
    this.form.appendChild(this.br);
    
    this.register = document.createElement('button');
    this.register.innerText = 'Register';
    
    this.register.type='button';
    this.register.addEventListener('click', welcomeCallback);
    this.form.appendChild(this.register);
}
Register.prototype = Object.create(Panel.prototype);
Register.prototype.constructor = Register;
function Welcome(title, tag, welcomeCallback) {
    Panel.call(this, title, tag);
    this.element.style.display = 'none';
    this.welcome = document.createElement('h1');
    this.element.appendChild(this.welcome);
}
Welcome.prototype = Object.create(Panel.prototype);
Welcome.prototype.constructor = Welcome;