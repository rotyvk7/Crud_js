module.exports = (application) => {
    application.get('/listaAdministrador', (req, res) => {
        application.app.controllers.listaAdministrador.listaAdministrador(application, req, res)
    })

    application.get('/deleteNumberAdmin', (req, res) => {
        application.app.controllers.listaAdministrador.deleteNumberAdmin(application, req, res)
    })
}