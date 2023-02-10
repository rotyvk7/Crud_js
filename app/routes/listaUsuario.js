module.exports = (application) => {
    application.get('/listaUsuario', (req, res) => {
        application.app.controllers.listaUsuario.listaUsuario(application, req, res)
    })

    application.post('/addNumber', (req, res) => {
        application.app.controllers.listaUsuario.addNumber(application, req, res)
    })

    application.post('/updateNumber', (req, res) => {
        application.app.controllers.listaUsuario.updateNumber(application, req, res)
    })

    application.get('/deleteNumber', (req, res) => {
        application.app.controllers.listaUsuario.deleteNumber(application, req, res)
    })

    application.get('/logout', (req, res) => {
        application.app.controllers.listaUsuario.logout(application, req, res)
    })
}