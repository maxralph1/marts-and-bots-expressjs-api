const Wishlist = require('../models/Wishlist');
const { body, validationResult } = require('express-validator');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');



const getAllWishlists = async (req, res) => {
  const wishlists = await Wishlist.find().sort('-created_at');
  if ((!wishlists) || (wishlists.length < 1)) return res.status(404).json({ "message": "no wishlists found" });
};


const getWishlist = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ "message": "Accurate wishlist ID required" });

  const wishlist = await Wishlist.findOne({ _id: req.params.id }).exec();
  if (!wishlist) {
    return res.status(404).json({ "message": `No wishlist matches the wish;list ID ${req.params.id}` });
  }
  res.json(wishlist);
};


const createWishlist = [
  body('product')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Product is required')
      .escape(),
  body('user')
      .trim()
      .isLength({ min: 1 })
      .withMessage('User is required')
      .escape()
  ,
  async (req, res) => {
    if (req.body?.product) req.body.product;
    if (req.body?.user) req.body.user;

    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    };

    const wishlist = await Wishlist({
      product: req.body.product,
      user: req.body.user
    });

    wishlist.save((err) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(201).json(wishlist);
    })
  }
];


const updateWishlist = [
  body('product')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Product is required')
      .escape(),
  body('user')
      .trim()
      .isLength({ min: 1 })
      .withMessage('User is required')
      .escape()
  ,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    };

    const wishlist = await Wishlist.findOne({ _id: req.params.id }).exec();
    if (!wishlist) {
      return res.status(404).json({ "message": `The specified wishlist ${req.body.wishlist} does not match our records` });
    };

    if (req.body?.product) wishlist.product = req.body.product;
    if (req.body?.user) wishlist.user = req.body.user;

    const result = await wishlist.save((err) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.json(result);
    });
  }
];


const deleteWishlist = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ "message": "Accurate wishlist required" });

  const wishlist = await Wishlist.findOne({ _id: req.params.id }).exec();
  if (!wishlist) {
    return res.status(404).json({ "message": `No wishlist matches ${req.params.id}` });
  }
  const result =  await wishlist.deleteOne();
  res.json(result);
};



module.exports = {
 getAllWishlists,
 getWishlist,
 createWishlist,
 updateWishlist,
 deleteWishlist
};