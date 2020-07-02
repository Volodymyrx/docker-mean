const express = require('express')
const  mongoose = require('mongoose')
const bodyParser = require('body-parser')

const authRoutes = require('./routes/auth')
const config = require('./config/config')

const app = express();

mongoose.connect(config.dbURI)
    .then(()=>console.log('MongooDB connected.'))
    .catch(error => console.log('error connected mongodb',error))


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('morgan')('dev'))
app.use(require('cors')())

app.use('/',authRoutes)



module.exports = app;

