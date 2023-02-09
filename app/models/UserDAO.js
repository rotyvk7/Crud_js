class UserDAO{
    constructor(UserModel){
        this._UserModel = UserModel
    }

    createUser = async (login, password, phones, admin)=>{
        const result = await this._UserModel.create(login, password, phones, admin)
        console.log(result)
    }

    getUser = async (login) =>{
        return await this._UserModel.findOne({login})
    }

    updateUser = async (login, number)=>{
        const result = await this._UserModel.updateOne()
    }
}