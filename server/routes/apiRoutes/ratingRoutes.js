const express = require('express');
const router = express.Router();
const ratingController = require('../../controllers/ratingController');


router.route('/')
    .get(ratingController.getAllRatings)
    .post(ratingController.createRating);

router.route('/:id')
    .get(ratingController.getRating)
    .put(ratingController.updateRating)
    .delete(ratingController.deleteRating);


module.exports = router;