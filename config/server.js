const express = require('express')
const db = require('./dbConnection')
const consign = require('consign')
const app = express()

app.set('view engine', 'ejs')
app.set('views', './app/views')
app.use(express.static('./app/public'))

consign()
.include('app/routes')
.then('app/controllers')
.into(app)

app.db = db
module.exports = app