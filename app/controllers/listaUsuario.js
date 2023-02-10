module.exports.listaUsuario = async (application, req, res) => {
    const UserDAO = new application.app.models.UserDAO(application.db.UserModel)
    const data = await UserDAO.getUser(req.session.passport.user.login)

    const errors = req.query.errors ? req.query.errors: false
    const deleted = req.query.deleted ? true: false
    const registered = req.query.registered ? true: false

    const user = {
        login: data.login,
        phones: data.phones,
    }

    res.render('listaUsuario', { user, errors, deleted, registered })
}

module.exports.addNumber = (application, req, res) => {
    const login = req.session.passport.user.login
    const number = req.body.newNumber
    const UserDAO = new application.app.models.UserDAO(application.db.UserModel)
    
    if (!number) {
        const error = 'Preencha um número para adicionar!'
        res.redirect(`/listaUsuario?errors=${error}`)
    } else {
        UserDAO.insertNumber(login, number, (result, error) => {
            if (result !== null) {
                console.log(result)
                res.redirect('/listaUsuario?registered=true')
            }
            if (error !== null) {
                console.log(error)
                res.redirect(`/listaUsuario?errors=${error}`)
            }
        })
    }
}

module.exports.updateNumber = (application, req, res) => {
    const login = req.session.passport.user.login
    const numberId = req.body.numberId
    const newNumber = req.body.number
    const UserDAO = new application.app.models.UserDAO(application.db.UserModel)
    
    if (!newNumber) {
        const error = 'Preencha um número para adicionar!'
        res.redirect(`/listaUsuario?errors=${error}`)
    } else {
        UserDAO.updateNumber(login, numberId, newNumber, (result, error) => {
            if (result !== null) {
                console.log(result)
                res.redirect('/listaUsuario?registered=true')
            }
            if (error !== null) {
                console.log(error)
                res.redirect(`/listaUsuario?errors=${error}`)
            }
        })
    }
}

module.exports.deleteNumber = (application, req, res) => {
    const login = req.session.passport.user.login
    const numberId = req.query.numberId
    const UserDAO = new application.app.models.UserDAO(application.db.UserModel)

    UserDAO.deleteNumber(login, numberId, (result, error) => {
        if (result !== null) {
            console.log(result)
            res.redirect('/listaUsuario?deleted=true')
        }
        if (error !== null) {
            console.log(error)
            res.redirect('/listaUsuario?errors=true')
        }
    })
}

module.exports.logout = (application, req, res) => {
    if (req.isAuthenticated()) {
        req.session.destroy(err => {
            res.redirect('/')
        })
    }
}