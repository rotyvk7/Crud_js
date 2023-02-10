module.exports = (application) => {
    application.get('/', (req, res) => {
        application.app.controllers.index.index(application, req, res)
    })

    application.post('/login', application.passport.authenticate('local', { failureRedirect: '/?fail=true' }), (req, res) => {
        application.app.controllers.index.successLogin(application, req, res)
    })
}