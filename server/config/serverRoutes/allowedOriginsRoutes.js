const express = require('express');
const router = express.Router();
const allowedOriginsController = require('../serverControllers/allowedOriginsController')


router.route('/6cdd1607780a90caeba1a0e1344ad8d0d4c26921')
    .get(allowedOriginsController.getAllOrigins)
    .post(allowedOriginsController.createOrigin);

  
module.exports = router;