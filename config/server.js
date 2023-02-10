const express = require('express')
const db = require('./dbConnection')
const consign = require('consign')
const app = express()

app.set('view engine', 'ejs')
app.set('views', './app/views')

app.use(express.static('./app/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

consign()
.include('app/routes')
.then('app/controllers')
.then('app/models')
.into(app)

app.db = db
module.exports = app