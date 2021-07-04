const mongoose = require('mongoose')

async function connectToDatabase() {
  if ([0, 3].includes(mongoose.connection.readyState)) {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  }
}

module.exports = {connectToDatabase}
