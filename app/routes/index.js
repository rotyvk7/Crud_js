module.exports = (application) => {
    application.get('/', (req, res) => {
        application.app.controllers.index.index(application, req, res)
    })

    application.post('/', (req, res) => {
        application.app.controllers.index.login(application, req, res)
    })
}