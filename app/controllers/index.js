module.exports.index = (application, req, res) => {
    res.render('index')
}

module.exports.login = (application, req, res) => {
    const user = req.body

    const UserDAO = new application.app.models.UserDAO(application.db.UserModel)

    const dataUser = UserDAO.getUser(user.login)

    if (dataUser !== null) {
        if (dataUser.password !== user.password) {
            res.sendStatus(404)
        }
        res.sendStatus(200)
    }
    res.sendStatus(404)
}