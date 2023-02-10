const express = require('express')
const db = require('./dbConnection')
const consign = require('consign')
const passport = require('passport')
const session = require('express-session')
const app = express()

require('./auth')(passport)

app.set('view engine', 'ejs')
app.set('views', './app/views')

// Middlewares
app.use(express.static('./app/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: '123',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 60 * 1000 }
}))
app.use(passport.initialize())
app.use(passport.session())

app.passport = passport

consign()
.include('app/routes')
.then('app/controllers')
.then('app/models')
.into(app)

app.db = db

module.exports = app