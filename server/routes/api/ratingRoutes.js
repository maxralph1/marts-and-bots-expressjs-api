const express = require('express');
const router = express.Router();
const ratingController = require('../../controllers/ratingController');
const { route } = require('./brandRoutes');


router.route('/')
    .get(ratingController.getAllRatings)
    .post(ratingController.createRating)
    .put(ratingController.updateRating)
    .delete(ratingController.deleteRating);

router.get('/:id', ratingController.getRating);


module.exports = router;