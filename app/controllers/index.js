module.exports.index = (application, req, res) => {

    if (req.isAuthenticated() && req.session.passport.user.admin) {
        res.redirect('/listaAdministrador')
    }
    else if(req.isAuthenticated() && !req.session.passport.user.admin) {
        res.redirect('/listaUsuario')
    } else {
        const fail = req.query.fail ? true: false
        const registered = req.query.registered ? true: false

        res.render('index', { fail, registered })
    }
}

module.exports.successLogin = async (application, req, res) => {
    const UserDAO = new application.app.models.UserDAO(application.db.UserModel)
    const data = await UserDAO.getUser(req.session.passport.user.login)
    if (data.admin) {
        res.redirect('/listaAdministrador')
    } else {
        res.redirect('/listaUsuario')
    }  
}