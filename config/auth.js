const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const UserDAO = require('../app/models/UserDAO')()
const { UserModel } = require('./dbConnection')

module.exports = (passport) => {

    passport.serializeUser(function (user, done) {
        done(null, user)
    })

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    passport.use(new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password'
    },

        async (login, password, done) => {
            try {
                const modelUser = new UserDAO(UserModel)

                const user = await modelUser.getUser(login)

                if (!user) 
                    return done(null, false)

                const isValid = bcrypt.compareSync(password, user.password)
                
                if (!isValid)
                    return done(null, false)

                return done(null, user)
            } catch (err) {
                done(err, false)
            }
        }
    ))
}