const express = require('express');
const router = express.Router();
const homeRouter = require('../routes/root');

router.get('/', homeRouter);

module.exports = router;