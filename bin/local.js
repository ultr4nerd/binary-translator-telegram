const app = require('../app')
const debug = require('debug')('app:express')
const {connectToDatabase} = require('../utils/database')

const server = app.listen(process.env.PORT || 3000, async () => {
  try {
    await connectToDatabase()
    debug(`Listening on http://localhost:${server.address().port} 🚀`)
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
});
