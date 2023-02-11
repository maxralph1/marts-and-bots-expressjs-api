const express = require('express');
const router = express.Router();
const wishlistController = require('../../controllers/wishlistController');


router.route('/')
    .get(wishlistController.getAllWishlists)
    .post(wishlistController.createWishlist)
    .put(wishlistController.updateWishlist)
    .delete(wishlistController.deleteWishlist);

router.get('/:id', wishlistController.getWishlist);


module.exports = router;