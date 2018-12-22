let fs = require('fs')

class Storage {


    save(model) {

        return new Promise((resolve, reject) => {

            try {
                if (!fs.existsSync(`./files/${model.PathFile}`)) {

                    fs.writeFileSync(`./files/${model.PathFile}`, JSON.stringify([]))
                }
            } catch (error) {
                reject(error.message)
                done()
            }
            fs.readFile(`./files/${model.PathFile}`, (err, data) => {

                if (err) {

                    reject(error.message)
                    done()
                }

                try {
                    data = JSON.parse(data)
                    let found = data.find(_item => _item.username === model.Username)
                    if (!found) {
                        model.validateModel()
                        if (!model.HasErrors) {
                            data.push(model.toSave())
                            fs.writeFile(`./files/${model.PathFile}`, JSON.stringify(data), err => {

                                if (err) reject(err)
                                else {
                                    resolve(true)
                                }

                            })

                        }
                        else {
                            reject(`The ${model.__proto__.constructor.name} has validation errors`)
                        }
                    } else {
                        reject(`Exists a ${model.__proto__.constructor.name} with the username "${model.Username}"`)
                    }

                } catch (error) {
                    reject(error.message)
                }
            })

        })

    }

    update(model) {

        return new Promise((resolve, reject) => {

            fs.readFile(`./files/${model.PathFile}`, (err, data) => {

                if (err) {

                    reject(error.message)
                    done()
                }

                try {
                    data = JSON.parse(data)
                    let index = data.findIndex(item => { return item.id === model.Id })

                    if (index < 0) {
                        reject(`Can not update an inexisting ${model.__proto__.constructor.name}`)
                    } else if (data.findIndex(item => { return item.username === model.Username && item.id !== model.Id }) > -1) {
                        reject(`Can not update a ${model.__proto__.constructor.name} beacuse exists a ${model.__proto__.constructor.name} with the same username: ${model.Username}`)

                    } else {
                        model.validateModel()
                        if (!model.HasErrors) {
                            data[index] = model.toSave()
                            fs.writeFile(`./files/${model.PathFile}`, JSON.stringify(data), err => {

                                if (err) reject(err)
                                else {
                                    resolve(true)
                                }

                            })

                        } else {
                            reject(`The ${model.__proto__.constructor.name} has validation errors`)
                        }
                    }

                } catch (error) {
                    reject(error.message)
                }
            })

        })

    }


    delete(file_path, id) {

        return new Promise((resolve, reject) => {

            fs.readFile(`./files/${file_path}`, (err, data) => {

                if (err) {
                    reject(error.message)
                    done()
                }
                try {

                    data = JSON.parse(data)
                    let index = data.findIndex(item => item.id === id)
                    if (index === -1) {
                        reject("The model not exists")
                    }
                    else {
                        data.splice(index, 1)
                        fs.writeFile(`./files/${file_path}`, JSON.stringify(data), err => {

                            if (err) reject(err)
                            else {
                                resolve(true)
                            }

                        })
                    }

                } catch (error) {
                    reject(error)
                }
            })

        })

    }

    getModelById(file_path, id) {

        return new Promise((resolve, reject) => {

            fs.readFile(`./files/${file_path}`, (err, data) => {

                if (err) {
                    reject(error.message)
                    done()
                }

                try {
                    data = JSON.parse(data)
                    let index = data.findIndex(item => item.id === id)
                    if (index < 0) {
                        reject("The model not exists")
                    }
                    else {

                        let cp = Array.from(data)
                        resolve(cp[index])
                    }

                } catch (error) {
                    reject(error)
                }
            })

        })

    }

    getAll(model) {

        return new Promise((resolve, reject) => {

            fs.readFile(`./files/${model.PathFile}`, (err, data) => {

                if (err) {
                    reject(error.message)
                    done()
                }

                try {
                    data = JSON.parse(data)
                    resolve(data)
                } catch (error) {
                    reject(error.message)
                }
            })

        })

    }

}


module.exports = Storage