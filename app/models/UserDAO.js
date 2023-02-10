class UserDAO{
    constructor(UserModel) {
        this._UserModel = UserModel
    }

    createUser =  (login, password, phone, callback)=>{
        this._UserModel.create({
            login: login,
            password: password,
            phones: [{
                number: phone
            }],
            admin: false
        })
        .then((result)=>{
            callback(result, null)
        })
        .catch((error)=>{
            callback(null, error)
        })
    }

    getUser = async (login) =>{
        return await this._UserModel.findOne({login})
    }

    getAllUsers = async () => {
        return await this._UserModel.find({ admin: false })
    }

    updateNumber = (login, numberId, newNumber, callback)=>{
        this._UserModel.findOne({
            login: login,
            'phones._id': numberId
        }).then(result => {
            const numbers = result.phones
            const hasNumber = numbers.forEach(el => el.number === newNumber)
            console.log(hasNumber)
            if(!hasNumber) {
                this._UserModel.updateOne(
                    {
                        login: login,
                        'phones._id': numberId
                    },
                    {
                        $set: {
                            'phones.$.number': newNumber
                        }
                    }
                ).then((result)=>{
                    callback(result, null)
                })
                .catch((error)=>{
                    callback(null, 'Ocorreu um erro!')
                })
            } else {
                callback(null, 'Esse número já existe!')
            }
        })
    
    }

    insertNumber = (login, number, callback)=> {
        this._UserModel.findOne({
            login: login,
            'phones.number': number
        }).then(result => {
            if(result === null) {
                this._UserModel.updateOne(
                    {
                        login: login
                    },
                    {
                        $push: {
                            phones: {
                                number: number
                            }
                        }
                    }
                ).then((result)=>{
                    callback(result, null)
                })
                .catch((error)=>{
                    callback(null, 'Ocorreu um erro!')
                })
            } else {
                callback(null, 'Número já existe!')
            }
        })
    }

    deleteNumber = (login, numberId, callback)=> {
        this._UserModel.updateOne(
            {
                login: login,
                'phones._id': numberId
            },
            {
                $pull: {
                    phones: {
                        _id: numberId
                    }
                }
            }
        ).then((result)=>{
            callback(result, null)
        })
        .catch((error)=>{
            callback(null, `'Erro ao deletar o número!' ${error}`)
        })
    }
}

module.exports = () => {
    return UserDAO
}