function Component(tag) {
    this.element = document.createElement(tag);
}

Component.prototype.show = function () {
    this.element.style.display = 'block';
};

Component.prototype.hide = function () {
    this.element.style.display = 'none';
};

function Panel(title, tag) {
    Component.call(this, tag); // this.element = document.createElement(tag);

    this.element.className = 'panel';

    this.title = document.createElement('h2');
    this. title.innerText = title;
    this.title.className = 'panel__title'

    this.element.appendChild(this.title);
}

Panel.prototype = Object.create(Component.prototype);
Panel.prototype.constructor = Panel;

function Dialog(title, text, tag) {        
    Panel.call(this, title, tag); //this.element = document.createElement(tag) & everything from Panel (title)


    this.element.className = 'dialog'; //change class name from panel top dialog

    this.title.className = 'dialog__title'; // change title class name

    this.body = document.createElement('p'); //create text
    this.body.innerText = text;             //add text
    this.body.className = 'dialog__body';   //add class name for future css

    this.element.appendChild(this.body);
}

Dialog.prototype = Object.create(Panel.prototype);
Dialog.prototype.constructor = Dialog;

function Alert(title, text, tag, callback, error) {
    Dialog.call(this, title, text, tag); //creates automatically title + text (seen in dialog) 

    this.element.className = error ? 'alert alert--danger' : 'alert'; // class names for css, we give true or false in error parameter

    this.title.className = 'alert__title';

    this.body.className = 'alert__body';

    this.accept = document.createElement('button'); 
    this.accept.innerText = 'Accept';

    // var self = this;

    // this.accept.addEventListener('click', function(event) {
    //     self.element.style.display = 'none';
    // });

    this.accept.addEventListener('click', function () {
        this.element.style.display = 'none';

        callback();
    }.bind(this)); // we bind the context of Alert to the anonymous function so that it can sucessfully hide on command

    this.accept.className = 'alert__button';

    this.element.appendChild(this.accept);
}

Alert.prototype = Object.create(Dialog.prototype);
Alert.prototype.constructor = Alert;

function Confirm(title, text, tag, acceptCallback, cancelCallback) {
    Dialog.call(this, title, text, tag); // creates title, text, and tag elements (see dialog constructor)

    this.element.className = 'confirm'; // adds class name for css reasons

    this.title.className = 'confirm__title'; //adds class name to title for css reasons 

    this.body.className = 'confirm__body';  // adds class name to body for css reasons

    this.cancel = document.createElement('button');  // "por convenio" first cancel then accept. creates button
    this.cancel.innerText = 'Cancel';
    this.cancel.className = 'confirm__button'; //class name for css reasons

    this.cancel.addEventListener('click', function () { //adds event listener on click to the button
        this.element.style.display = 'none';

        cancelCallback();
    }.bind(this)); // binds the context of confirm because the function is anonymous. another way would be to declare var self = this 

    this.element.appendChild(this.cancel); //adds cancel button inside element (the confirm box)

    this.accept = document.createElement('button'); //same thing as cancel
    this.accept.innerText = 'Accept';
    this.accept.className = 'confirm__button confirm__button--accept';

    this.accept.addEventListener('click', function () {
        this.element.style.display = 'none';

        acceptCallback();
    }.bind(this));

    this.element.appendChild(this.accept);
}

Confirm.prototype = Object.create(Dialog.prototype);
Confirm.prototype.constructor = Confirm;