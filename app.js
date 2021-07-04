const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const app = express()

// Third party middleware

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

// Routes
app.use('/telegram', require('./routes/telegram'))

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.sendStatus(200)
});


module.exports = app
