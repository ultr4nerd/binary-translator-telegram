const app = require('../app')
const {connectToDatabase} = require('../utils/database')

app.use(async (req, res, next) => {
  await connectToDatabase()
  console.log('database connected...')
  next()
})

exports.binaryTranslator = app
