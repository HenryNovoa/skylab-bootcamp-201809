let Model = require("./model")

class PostIt extends Model {
   
    get Id() {

        return this.id
    }

    set Id(value) {

        this.id = value

    }

    get Content() {

        return this.content
    }

    set Content(value) {

        this.content = value

    }
   

    constructor() {
        
        super("", ["content"])
        this.id = Date.now()
        this.setValidationRules()
        this.content = undefined
    }

    getModelFromPlainObject(obj) {

        if (typeof obj !== "object") throw TypeError("Error in getModelFromPlainObject: The parameter is not of type object")

        for (var p in obj) {

            this[p] = obj[p]

        }
        
    }

    setValidationRules(){

        this.validationRules = {

            id: [
                {
                    typeValidation: "type",
                    requiredType: "number",
                    message: "The id attribute is not of type number"
                }
            ],
            content: [
                {
                    typeValidation: "type",
                    requiredType: "string",
                    message: "The content attribute is not of type string"
                },
                {
                    typeValidation: "exists",
                    message: "The content attribute can not be empty or undefined"
                }
            ]
        }
    }

    toSave(){
        return {id:this.Id, content:this.Content}
    }

}

module.exports = PostIt