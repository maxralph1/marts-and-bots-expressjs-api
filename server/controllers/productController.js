const Product = require('../models/Product');
const { body, validationResult } = require('express-validator');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');



const getAllProducts = async (req, res) => {
  const products = await Product.find().sort('-created_at');
  if ((!products) || (products.length < 1)) return res.status(404).json({ "message": "No products found" });
  res.json(products);
};


const getProduct = async (req, res) => {
  if (!req?.params?.slug) return res.status(400).json({ "message": "Accurate product ID required" });

  const product = await Product.findOne({ slug: req.params.slug }).exec();
  if (!product) {
    return res.status(404).json({ "message": `No product matches the product ID ${req.params.slug}` });
  }
  res.json(product);
};


const createProduct = [
  body('name')
      .trim()
      .isLength({ max: 100 })
      .withMessage('Product name must not be more than 100 characters long.')
      .escape(),
  body('details')
      .trim()
      .escape(),
  body('size')
      .trim()
      .isNumeric()
      .withMessage('Size must be a number')
      .escape(),
  body('size_unit')
      .trim()
      .escape(),
  body('image')
      .trim()
      .escape(),
  body('images')
      .trim()
      .isArray()
      .withMessage('Must be list of images')
      .escape(),
  body('web_link')
      .trim()
      .escape(),
  body('video_link')
      .trim()
      .escape(),
  body('brand')
      .trim()
      .escape(),
  body('category')
      .trim()
      .escape(),
  body('sub_category')
      .trim()
      .escape(),
  body('colors')
      .trim()
      .escape(),
  body('purchase_price')
      .trim()
      .isNumeric()
      .withMessage('Must be a number')
      .escape(),
  body('purchase_currency')
      .trim()
      .escape(),
  body('selling_price')
      .trim()
      .isNumeric()
      .withMessage('Must be a number')
      .escape(),
  body('selling_currency')
      .trim()
      .escape(),
  body('discount_unit')
      .trim()
      .isNumeric()
      .withMessage('Must be a number')
      .escape(),
  body('discount_type')
      .trim()
      .escape(),
  body('status')
      .trim()
      .escape()
  ,
  async (req, res) => {
    if (req.body?.name) req.body.name;
    if (req.body?.details) req.body.details;
    if (req.body?.size) req.body.size;
    if (req.body?.size_unit) req.body.size_unit;
    if (req.body?.image) req.body.image;
    if ([req.body?.images]) [req.body.images];
    if (req.body?.web_link) req.body.web_link;
    if (req.body?.video_link) req.body.video_link;
    if (req.body?.brand) req.body.brand;
    if (req.body?.category) req.body.category;
    if (req.body?.sub_category) req.body.sub_category;
    if (req.body?.colors) req.body.colors;
    if (req.body?.purchase_price) req.body.purchase_price;
    if (req.body?.purchase_currency) req.body.purchase_currency;
    if (req.body?.selling_price) req.body.selling_price;
    if (req.body?.selling_currency) req.body.selling_currency;
    if (req.body?.discount_unit) req.body.discount_unit;
    if (req.body?.discount_type) req.body.discount_type;
    if (req.body?.status) req.body.status;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    };

    const product = await new Product({
      name: req.body.name,
      details: req.body.details,
      size: req.body.size,
      size_unit: req.body.size_unit,
      code: `${uuid()}`,
      slug: `${(req.body.name).toLowerCase().replace(/\s+/g, '-')}-${uuid().replaceAll('-', '')}`,
      image: req.body.image,
      images: [req.body.images],
      web_link: req.body.web_link,
      video_link: req.body.video_link,
      brand: req.body.brand,
      category: req.body.category,
      colors: req.body.colors,
      purchase_price: req.body.purchase_price,
      purchase_currency: req.body.purchase_currency,
      selling_price: req.body.selling_price,
      selling_currency: req.body.selling_currency,
      discount_unit: req.body.discount_unit,
      discount_type: req.body.discount_type,
      status: req.body.status
    });

    product.save((err) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(201).json(product);
    });
  }
];


const updateProduct = [
  body('name')
      .trim()
      .isLength({ max: 100 })
      .withMessage('Product name must not be more than 100 characters long.')
      .escape(),
  body('details')
      .trim()
      .escape(),
  body('size')
      .trim()
      .isNumeric()
      .withMessage('Size must be a number')
      .escape(),
  body('size_unit')
      .trim()
      .escape(),
  body('image')
      .trim()
      .escape(),
  body('images')
      .trim()
      .isArray()
      .withMessage('Must be list of images')
      .escape(),
  body('web_link')
      .trim()
      .escape(),
  body('video_link')
      .trim()
      .escape(),
  body('brand')
      .trim()
      .escape(),
  body('category')
      .trim()
      .escape(),
  body('sub_category')
      .trim()
      .escape(),
  body('colors')
      .trim()
      .escape(),
  body('purchase_price')
      .trim()
      .isNumeric()
      .withMessage('Must be a number')
      .escape(),
  body('purchase_currency')
      .trim()
      .escape(),
  body('selling_price')
      .trim()
      .isNumeric()
      .withMessage('Must be a number')
      .escape(),
  body('selling_currency')
      .trim()
      .escape(),
  body('discount_unit')
      .trim()
      .isNumeric()
      .withMessage('Must be a number')
      .escape(),
  body('discount_type')
      .trim()
      .escape(),
  body('status')
      .trim()
      .escape()
  ,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    };

    const product = await Product.findOne({ slug: req.params.slug }).exec();
    if (!product) {
      return res.status(404).json({ "message": `The specified product ${req.params.slug} does not match our records` });
    };
    
    if (req.body?.name) product.name = req.body.name;
    if (req.body?.details) product.details = req.body.details;
    if (req.body?.size) product.size = req.body.size;
    if (req.body?.size_unit) product.size_unit = req.body.size_unit;
    if (req.body?.code) req.body.code = null;
    product.slug = `${(req.body.name).toLowerCase().replace(/\s+/g, '-')}-${uuid().replaceAll('-', '')}`;
    if (req.body?.image) product.image = req.body.image;
    if ([req.body?.images]) product.images = [req.body.images];
    if (req.body?.web_link) product.web_link = req.body.web_link;
    if (req.body?.video_link) product.video_link = req.body.video_link;
    if (req.body?.brand) product.brand = req.body.brand;
    if (req.body?.category) product.category = req.body.category;
    if (req.body?.sub_category) product.sub_category = req.body.sub_category;
    if (req.body?.colors) product.colors = req.body.colors;
    if (req.body?.purchase_price) product.purchase_price = req.body.purchase_price;
    if (req.body?.purchase_currency) product.purchase_currency = req.body.purchase_currency;
    if (req.body?.selling_price) product.selling_price = req.body.selling_price;
    if (req.body?.selling_currency) product.selling_currency = req.body.selling_currency;
    if (req.body?.discount_unit) product.discount_unit = req.body.discount_unit;
    if (req.body?.discount_type) product.discount_type = req.body.discount_type;
    if (req.body?.status) product.status = req.body.status;

    const result = await product.save((err) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.json(result);
    });
  }
];


const deleteProduct = async (req, res) => {
  if (!req?.params?.slug) return res.status(400).json({ "message": "Accurate product required" });

  const product = await Product.findOne({ slug: req.params.slug }).exec();
  if (!product) {
    return res.status(404).json({ "message": `No product matches ${req.params.slug}` });
  }
  const result = await product.deleteOne();
  res.json(result);
};



module.exports = {
 getAllProducts,
 getProduct,
 createProduct,
 updateProduct,
 deleteProduct
}