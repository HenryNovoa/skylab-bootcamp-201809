let Storage = require("./storage")

class Model {

    get HasErrors() {

        return this.hasErrors
    }

    get ValidationErrors() {

        return this.validationErrors
    }

    get PathFile() {

        return this.path_file
    }

    constructor(path_file, propertiesToValidate) {
        
        this.hasErrors = false
        this.path_file = path_file

        this.validationErrors = []

        this.propertiesToValidate = propertiesToValidate
       
    }

    setValidationRules() {

        throw Error("The getModelFromPlainObject method is not implemented by the child")

    }

    validateModel() {

        this.validationErrors = []
        this.hasErrors = false

        for (let p in this) {
           
            if(this.propertiesToValidate.indexOf(p) < 0) continue

            if (typeof this[p] === "string" && this[p] !== undefined)
                this[p] = this[p].trim()
        }

        for (let p in this) {

            if(this.propertiesToValidate.indexOf(p) < 0) continue

            if (this[p] instanceof Array) continue
            
            let validationRules = this.validationRules[p]
            validationRules.forEach(rule => {

                switch (rule.typeValidation) {

                    case "type":
                        if (typeof this[p] !== rule.requiredType) {
                            this.validationErrors.push(rule.message)
                        }
                        break;
                    case "exists":
                        if (this[p] === undefined || !this[p].length) {
                            this.validationErrors.push(rule.message)
                        }
                        break;
                    case "email":
                        if (!this[p].match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)[.]{1}([a-zA-Z]{2,5})$/g)) {
                            this.validationErrors.push(rule.message)
                        }
                        break;
                    case "maxlength":
                        if (this[p].length > rule.maxLength) {
                            this.validationErrors.push(rule.message)
                        }
                        break;
                    case "minlength":
                        if (this[p].length < rule.minLength) {
                            this.validationErrors.push(rule.message)
                        }
                        break;
                }
                if (this.validationErrors.length > 0)
                    return

            })

        }
       
        if (this.validationErrors.length > 0) {
            this.hasErrors = true
        }

    }

    getModelFromPlainObject() {

        throw Error("The getModelFromPlainObject method is not implemented by the child")
    }

    toSave() {

        throw Error("The toSave method is not implemented by the child")
    }

    save() {
        let storage = new Storage()
        return storage.save(this)
    }

    delete() {
        let storage = new Storage()
        return storage.delete(this.path_file, this.id)
    }

    update() {
        let storage = new Storage()
        return storage.update(this)
    }

    getModelById(id) {
        
        let storage = new Storage()
        return storage.getModelById(this.path_file, id)
    }

    getAll() {
        let storage = new Storage()
        return storage.getAll(this)
    }
}

module.exports = Model