const app = require('../app')
const debug = require('debug')('app:express')

const server = app.listen(process.env.PORT || 3000, async () => {
  debug(`Listening on http://localhost:${server.address().port} 🚀`)
});
