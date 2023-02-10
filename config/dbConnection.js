const mongoose = require ('mongoose')

const UserSchema = mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phones: [{
        number: {
            type: String
        }
    }],
    admin: {
        type: Boolean,
        required: true
    }
})

const UserModel = mongoose.model('users', UserSchema)

async function connectDatabase() {

    try {
        const connection = await mongoose.connect('mongodb://127.0.0.1:27017/crudcadastro')

        const admin = await UserModel.findOne({ login: 'admin' })

        if (admin === null) {
            const result = await UserModel.create({
                login: 'admin',
                password: '$2a$06$HT.EmXYUUhNo3UQMl9APmeC0SwoGsx7FtMoAWdzGicZJ4wR1J8alW',
                phones: [{
                    number: 'admin'
                }],
                admin: true
            })
            console.log(result)
        } else {
            console.log("Conta de Administrador já existe!")
        }
        console.log('Conectado ao banco de dados!')
    } catch(error) {
        console.log("Error: " + error)
    }
}

connectDatabase()

module.exports = {UserModel}