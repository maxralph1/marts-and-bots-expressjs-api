const express = require('express');
const router = express.Router();
const reviewController = require('../../controllers/reviewController');


router.route('/')
    .get(reviewController.getAllReviews)
    .post(reviewController.createReview)
    .put(reviewController.updateReview)
    .delete(reviewController.deleteReview);

router.get('/:id', reviewController.getReview);


module.exports = router;