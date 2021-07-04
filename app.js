const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const {databaseMiddleware} = require('./utils/database')

const app = express()

// Third party middleware

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

// Local middleware
app.use(databaseMiddleware)

// Routes
app.use('/telegram', require('./routes/telegram'))

module.exports = app
