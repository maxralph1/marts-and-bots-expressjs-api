const express = require('express');
const router = express.Router();
const wishlistController = require('../../controllers/wishlistController');


router.route('/')
    .get(wishlistController.getAllWishlists)
    .post(wishlistController.createWishlist);

router.route('/:id')
    .get(wishlistController.getWishlist)
    .put(wishlistController.updateWishlist)
    .delete(wishlistController.deleteWishlist);


module.exports = router;