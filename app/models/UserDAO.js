class UserDAO{
    constructor(UserModel) {
        this._UserModel = UserModel
    }

    createUser =  (login, password, phones, admin, callback)=>{
        this._UserModel.create(login, password, phones, admin)
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

    updateNumber = (login, number, callback)=>{
        this._UserModel.updateOne(
            {
                login: login,
                'phones.number': number
            },
            {
                $set: {
                    'phones.$.number': number
                }
            }
        ).then((result)=>{
            callback(result, null)
        })
        .catch((error)=>{
            callback(null, error)
        })
    
    }

    insertNumber = (login, number, callback)=> {
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
            callback(null, error)
        })
    }

    deleteNumber = (login, number)=> {
        this._UserModel.updateOne(
            {
                login: login,
                'phones.number': number
            },
            {
                $pull: {
                    phones: {
                        number: number
                    }
                }
            }
        ).then((result)=>{
            callback(result, null)
        })
        .catch((error)=>{
            callback(null, error)
        })
    }
}

module.exports = () => {
    return UserDAO
}