const mongoose = require('mongoose')

let connected = false

async function connectToDatabase() {
  if (!connected) {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    connected = true
  }
}

async function databaseMiddleware(req, res, next) {
  console.log('connecting database...')
  await connectToDatabase()
  console.log('database connected...')
  next()
}

module.exports = {databaseMiddleware}
