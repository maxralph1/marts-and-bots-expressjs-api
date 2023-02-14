const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) != -1) {
      callback(null, true)
    } else {
      callback(new Error('CORS restriction!'))
    }
  },
  optionsSuccessStatus: 200
}

module.exports = corsOptions;