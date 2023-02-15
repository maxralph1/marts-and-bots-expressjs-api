const origins = {
  allowedOrigins: require('../allowedOrigins'),
  setAllowedOrigins: function (origins) { this.allowedOrigins = origins }
}

// const allowedOrigins = require('../allowedOrigins');

const getAllOrigins = (req, res) => {
  res.json(origins.allowedOrigins);
}

const createOrigin = (req, res) => {
  const newOrigin = {
    origin: req.body.origin
  }

  if (!newOrigin.origin) {
    return res.status(400).json({ "message": "An origin required" });
  }

  origins.setAllowedOrigins([...origins.allowedOrigins, newOrigin.origin]);
  res.status(201).json(origins.allowedOrigins);
}


module.exports = {
  getAllOrigins,
  createOrigin
}