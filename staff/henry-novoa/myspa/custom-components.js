
//create landing component
function Landing(title, tag,registerCallback,loginCallback){
    Panel.call(this,title,tag);

    this.element.className ='landing';      //give premade box a class name for css reasons
    this.title.className = 'landing__title';    //give premade title a class name for css reasons
    

    //register button
    this.register = document.createElement('button'); //create html button property named register
    this.register.innerText = 'Register' //give it some text
    this.register.addEventListener('click',registerCallback);   //give it a functionality
    this.register.className = 'landing__button'; //give it a class name for css reasons
    this.element.appendChild(this.register); //give it a place in the "element" box

    //add an or text in betweeen buttons
    this.element.appendChild(document.createTextNode(' or '));

    //login button
    this.login = document.createElement('button'); //create a html button property named login
    this.login.innerText = 'login'; // give it some text
    this.login.addEventListener('click',loginCallback); // give it a functionality
    this.login.className = 'landing__button' // give it a class name for css reasons
    this.element.appendChild(this.login); //add the button to the "element" box (that is landing);
}

//now we need to class this appropriately

Landing.prototype = Object.create(Panel.prototype); 
Landing.prototype.constructor = Landing;

//Create Login component
function Login(title,tag,loginCallback,backCallback){
    //call parent components
    Panel.call(this,title,tag);

    //default hide login
    this.hide();
    //give parent elements a name
    this.element.className = 'login' // give this box a name
    this.title.className = 'login__title'; // give the title a name
    
    //What do I want in this box? A form, a button, and a back link
    //form(including the button)
    this.form = document.createElement('form'); // create a html form in an object property
    this.form.addEventListener('submit',function(event){  //give the form a functionality when it presses the button
        event.preventDefault(); //the form button "refreshes the page automatically"
        var username = this.username.value; //saves future created username input
        var password = this.password.value; //saves future created password input

        loginCallback(username,password);
    }.bind(this)); //function is anonymous, must give it some context

    this.element.appendChild(this.form) //add form to the "element"(login) box created

    //create username input
    this.username = document.createElement('input'); // create html input in object property
    this.username.className = 'login__input'; // give it a class name
    this.username.placeholder = 'username'; //give it some inner text
    this.form.appendChild(this.username); //add this input to the form

    //create a password input
    this.password = document.createElement('input'); // creates an html input property
    this.password.className='login__input' // gives it a class name for css reasons
    this.password.placeholder = 'password'; // give it some innner text
    this.form.appendChild(this.password); // add this input to the form

    //create a login button where the before submit will be triggered, so all we need is to make it pretty
    this.login = document.createElement('button');
    this.login.innerText = 'Login';
    this.login.className = 'Login__button';
    this.form.appendChild(this.login); //add the login button to the form, triggering event

    //create a back link
    this.back= document.createElement('a'); 
    this.back.href='#';
    this.back.innerText='Back';
    this.back.addEventListener('click',backCallback); //has to be added here because form has it's own default functionality
    this.element.appendChild(this.back);
    

}
Login.prototype = Object.create(Panel.prototype);
Login.prototype.constructor = Login;

//Create register component

function Register(title,tag,registerCallback,backCallback){
    Panel.call(this,title,tag);
    
    this.element.className = 'register';
    this.title.className = 'register__title';

    //default hide register
    this.hide();

    //What do I want from the register? A bigger form, the corresponding input and a back link
    this.form = document.createElement('form');
    this.form.addEventListener('submit',function(event){
        event.preventDefault();

        var name = this.name.value;
        var surname = this.surname.value;
        var username = this.username.value;
        var password = this.password.value;
        //add functionality to the submit form
        registerCallback(name,surname,username,password); // function will be called that will want these values
    }.bind(this));

    this.element.appendChild(this.form) //add form to the 'element' box

    //add inputs

    this.name = document.createElement('input');
    this.name.className = 'input';
    this.name.placeholder = 'name';
    this.form.appendChild(this.name);

    this.surname = document.createElement('input');
    this.surname.className = 'input';
    this.surname.placeholder = 'surname';
    this.form.appendChild(this.surname);

    this.username = document.createElement('input');
    this.username.className = 'input';
    this.username.placeholder = 'username';
    this.form.appendChild(this.username);

    this.password= document.createElement('input');
    this.password.className = 'input';
    this.password.placeholder = 'password';
    this.form.appendChild(this.password);

    //add register button that will be added to form that gives it functionality, no need to explicitly give it functionality here
    this.register = document.createElement('button');
    this.register.className = 'register__button';
    this.register.innerText = 'Register';
    this.form.appendChild(this.register); //Added button to form

    //add back link
    this.back= document.createElement('a');
    this.back.href='#';
    this.back.innerText='Back';
    this.back.addEventListener('click',backCallback);// Since no default html functionality, we should give it a js functionality when pressed
    this.element.appendChild(this.back); // add back  link to the box
}

Register.prototype = Object.create(Panel.prototype);
Register.prototype.constructor = Register;

//create welcome component

function Welcome(title,tag){

  


    Panel.call(this,title,tag);
    this.element.className = 'welcome';
    this.element.title = 'welcome__title';
    
      //default hide welcome
      this.hide();
}

Welcome.prototype = Object.create(Panel.prototype);
Welcome.prototype.constructor = Welcome;
