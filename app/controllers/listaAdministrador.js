module.exports.listaAdministrador = async (application, req, res) => {
    const UserDAO = new application.app.models.UserDAO(application.db.UserModel)
    const data = await UserDAO.getUser(req.session.passport.user.login)

    if (data.admin) {
        const allUsers = await UserDAO.getAllUsers()
    
        const errors = req.query.errors ? req.query.errors: false
        const deleted = req.query.deleted ? true: false
        const registered = req.query.registered ? true: false
    
        const user = {
            login: data.login,
            phones: data.phones,
        }
    
        res.render('listaAdministrador', { user, allUsers, errors, deleted, registered })
    } else {
        res.redirect('/')
    }
}

module.exports.deleteNumberAdmin = async (application, req, res) => {
    const UserDAO = new application.app.models.UserDAO(application.db.UserModel)
    const data = await UserDAO.getUser(req.session.passport.user.login)

    if (data.admin) {
        const login = req.query.login
        const numberId = req.query.numberId

        UserDAO.deleteNumber(login, numberId, (result, error) => {
            if (result !== null) {
                console.log(result)
                res.redirect('/listaAdministrador?deleted=true')
            }
            if (error !== null) {
                console.log(error)
                res.redirect('/listaAdministrador?errors=true')
            }
        })
    } else {
        res.redirect('/')
    }
}