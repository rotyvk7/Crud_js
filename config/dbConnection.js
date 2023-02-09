const mongoose = require ('mongoose')

mongoose.connect('mongodb://localhost:27017/crudcadastro')
    .then(()=>{
        console.log('conectado ao banco')
    })
    .catch((error)=>{
        console.log(error)
    })

console.log('teste')

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
            type: String,
            unique: true
        }
    }],
    admin: {
        type: Boolean,
        required: true
    }
})

const UserModel = mongoose.model('users', UserSchema)
module.exports = {UserModel}