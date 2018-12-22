let Model = require("./model")
let PostIt = require("./postit")

class User extends Model {

    get Id() {

        return this.id
    }

    set Id(value) {

        this.id = value

    }

    get Name() {

        return this.name
    }

    set Name(value) {

        this.name = value

    }

    get Surname() {

        return this.surname
    }

    set Surname(value) {

        this.surname = value

    }

    get Email() {

        return this.email
    }

    set Email(value) {

        this.email = value

    }

    get Phone() {

        return this.phone
    }

    set Phone(value) {

        this.phone = value

    }

    get Username() {

        return this.username
    }

    set Username(value) {

        this.username = value

    }

    get Password() {

        return this.password
    }

    set Password(value) {

        this.password = value

    }

    get Postits() {

        return this.postits
    }

    set Postits(value) {

        this.postits = value

    }


    constructor() {

        super("users.json", ["name", "surname", "email", "phone", "username", "password"])
        this.setValidationRules()
        this.id = Date.now()
        this.name = undefined
        this.surname = undefined
        this.email = undefined
        this.phone = undefined
        this.username = undefined
        this.password = undefined
        this.postits = []

    }

    getModelFromPlainObject(obj) {

        if (typeof obj !== "object") throw TypeError("Error in getModelFromPlainObject: The parameter is not of type object")

        for (var p in obj) {

            if (Array.isArray(obj[p])){
               
                obj[p].forEach(postit => { 
                    let _postit = new PostIt() 
                    _postit.getModelFromPlainObject(postit)
                    this[p].push(_postit) 
                })
            }
            else
                this[p] = obj[p]

        }
      
    }

    setValidationRules() {

        this.validationRules = {

            id: [
                {
                    typeValidation: "type",
                    requiredType: "number",
                    message: "The id attribute is not of type number"
                }
            ],
            name: [
                {
                    typeValidation: "type",
                    requiredType: "string",
                    message: "The name attribute is not of type string"
                },
                {
                    typeValidation: "exists",
                    message: "The name attribute can not be empty or undefined"
                }
            ],
            surname: [
                {
                    typeValidation: "type",
                    requiredType: "string",
                    message: "The surname attribute is not of type string"
                },
                {
                    typeValidation: "exists",
                    message: "The surname attribute can not be empty or undefined"
                }
            ],
            email: [
                {
                    typeValidation: "type",
                    requiredType: "string",
                    message: "The email attribute is not of type string"
                },
                {
                    typeValidation: "exists",
                    message: "The email attribute can not be empty or undefined"
                },
                {
                    typeValidation: "email",
                    message: "The email has not the correct format"
                }
            ],
            phone: [
                {
                    typeValidation: "type",
                    requiredType: "string",
                    message: "The phone attribute is not of type string"
                },
                {
                    typeValidation: "exists",
                    message: "The phone attribute can not be empty or undefined"
                }
            ],
            username: [
                {
                    typeValidation: "type",
                    requiredType: "string",
                    message: "The username attribute is not of type string"
                },
                {
                    typeValidation: "exists",
                    message: "The username attribute can not be empty or undefined"
                }
            ],
            password: [
                {
                    typeValidation: "type",
                    requiredType: "string",
                    message: "The pasword attribute is not of type string"
                },
                {
                    typeValidation: "exists",
                    message: "The password attribute can not be empty or undefined"
                },
                {
                    typeValidation: "minlength",
                    minLength: 4,
                    message: `The password has to be at least 4 characters long`
                },
                {
                    typeValidation: "maxlength",
                    maxLength: 10,
                    message: `The password cant not exceed 10 characters`
                }
            ]
        }

    }

    toSave() {
        return { id: this.Id, postits:this.postits.map(postit => {return postit.toSave()}), name: this.Name, surname: this.Surname, email: this.Email, phone: this.Phone, username: this.Username, password: this.Password }
    }

    addPostIt(content) {

        return new Promise(resolve, reject => {

            if (typeof content !== "string" || !content.length) reject("The content of the postit is not correct")

            let postIt = new PostIt()
            postIt.Content = content
            this.postits.push(postIt)
            this.update().then(res => resolve(res)).catch(err => reject(err))

        })

    }

    deletePostIt(postitId) {

        return new Promise(resolve, reject => {

            if (typeof postitId !== "number" || !postitId) reject("The postitId parameter is not correct")

            if (!this.postits.length) resolve(true)

            let index = this.postits.findIndex(item => item.id === postitId)
            if (index < 0) {
                reject("The postit not exists")
            }
            this.postits.splice(index, 1)
            this.update().then(res => resolve(res)).catch(err => reject(err))

        })

    }

    editPostIt(postitId, content) {

        return new Promise(resolve, reject => {

            if (typeof postitId !== "number" || !postitId) reject("The postitId parameter is not correct")

            if (!this.postits.length) reject("The user has not postits")

            let index = this.postits.findIndex(item => item.id === postitId)
            if (index < 0) {
                reject("The postit not exists")
            }
            this.postits[index].Content = content
            this.update().then(res => resolve(res)).catch(err => reject(err))

        })

    }
}


module.exports = User