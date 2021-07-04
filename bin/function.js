const app = require('../app')
const {connectToDatabase} = require('../utils/database')

app.use(async (req, res, next) => {
  await connectToDatabase()
  next()
})

exports.binaryTranslator = app
