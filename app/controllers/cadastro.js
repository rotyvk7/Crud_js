const bcrypt = require('bcryptjs')

module.exports.cadastro = (application, req, res) => {
    res.render('cadastro')
}

module.exports.cadastrar = (application, req, res) => {
    const login = req.body.login.trim()
    let password = req.body.password.trim()
    const phone = req.body.phone.trim()

    password = bcrypt.hashSync(password, 10)

    console.log(password)

    const UserDAO = new application.app.models.UserDAO(application.db.UserModel)

    UserDAO.createUser(login, password, phone, (result, error) => {
        if (result !== null) {
            console.log(result)
            res.redirect('/?registered=true')
        }
        if (error !== null) {
            console.log(error)
            res.redirect('/?fail=true')
        }
    })
}