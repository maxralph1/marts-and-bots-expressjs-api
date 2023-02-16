const ProductInstance = require('../models/ProductInstance');
const { body, validationResult } = require('express-validator');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');



const getAllProductInstances = async (req, res) => {
  const productInstances = await ProductInstance.find().sort('-created_at');
  if ((!productInstances) || (productInstances.length < 1)) return res.status(404).json({ "message": "No product instances found" });
  res.json(productInstances);
};


const getProductInstance = async (req, res) => {
  if (!req?.params?.slug) return res.status(400).json({ "message": "Accurate product instance required" });

  const productInstance = await ProductInstance.findOne({ slug: req.params.slug }).exec();
  if (!productInstance) {
    return res.status(404).json({ "message": `No product instance matches the product instance ID ${req.params.slug}` });
  }
  res.json(productInstance);
};


const createProductInstance = [
  body('name')
      .trim()
      .isLength({ min: 2})
      .withMessage('The name must be a minimum of 2 characters long')
      .escape(),
  body('imprint')
      .trim()
      .escape(),
  body('color')
      .trim()
      .escape(),
  body('isbn')
      .trim()
      .escape(),
  body('other_details')
      .trim()
      .escape(),
  body('status')
      .trim()
      .escape(),
  body('product')
      .trim()
      .escape(),
  body('user')
      .trim()
      .escape()
  ,
  async (req, res) => {
    if (req.body?.name) req.body.name;
    if (req.body?.slug) req.body.slug = null;
    if (req.body?.imprint) req.body.imprint;
    if (req.body?.color) req.body.color;
    if (req.body?.isbn) req.body.isbn;
    if (req.body?.other_details) req.body.other_details;
    if (req.body?.status) req.body.status;
    if (req.body?.product) req.body.product;
    if (req.body?.user) req.body.user;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    };

    const duplicateProductInstance = await ProductInstance.findOne({ isbn: req.body.isbn }).exec();
    if (duplicateProductInstance) {
      return res.status(409).json({ "message": `A copy of ${duplicateProductInstance} already exists` });
    };

    const productInstance = await new ProductInstance({
      name: req.body.name,
      slug: `${(req.body.name).toLowerCase().replace(/\s+/g, '-')}-${uuid().replaceAll('-', '')}`,
      imprint: req.body.imprint,
      color: req.body.color,
      isbn: req.body.isbn,
      other_details: req.body.other_details,
      status: req.body.status,
      product: req.body.product,
      user: req.body.user
    });

    productInstance.save((err) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(201).json(productInstance);
    })
  }
];


const updateProductInstance = [
  body('name')
      .trim()
      .isLength({ min: 2})
      .withMessage('The name must be a minimum of 2 characters long')
      .escape(),
  body('imprint')
      .trim()
      .escape(),
  body('color')
      .trim()
      .escape(),
  body('isbn')
      .trim()
      .escape(),
  body('other_details')
      .trim()
      .escape(),
  body('status')
      .trim()
      .escape(),
  body('product')
      .trim()
      .escape(),
  body('user')
      .trim()
      .escape()
  ,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    };

    const productInstance = await ProductInstance.findOne({ slug: req.params.slug }).exec();
    if (!productInstance) {
      return res.status(404).json({ "message": `The specified product unit ${req.params.slug} does not match our records` });
    };
    if (req.body?.name) productInstance.name = req.body.name;
    productInstance.slug = `${(req.body.name).toLowerCase().replace(/\s+/g, '-')}-${uuid().replaceAll('-', '')}`;
    if (req.body?.imprint) productInstance.imprint = req.body.imprint;
    if (req.body?.color) productInstance.color = req.body.color;
    if (req.body?.isbn) productInstance.isbn = req.body.isbn;
    if (req.body?.other_details) productInstance.other_details = req.body.other_details;
    if (req.body?.status) productInstance.status = req.body.status;
    if (req.body?.product) productInstance.product = req.body.product;
    if (req.body?.user) productInstance.user = req.body.user;

    const result = await productInstance.save((err) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.json(result);
    });
  }
];


const deleteProductInstance = async (req, res) => {
  if (!req?.params?.slug) return res.status(400).json({ "message": "Accurate product unit required" });

  const productInstance = await ProductInstance.findOne({ slug: req.params.slug }).exec();
  if (!productInstance) {
    return res.status(404).json({ "message": `No product unit matches ${req.params.slug}` });
  }
  const result = await productInstance.deleteOne();
  res.json(result);
};



module.exports = {
 getAllProductInstances,
 getProductInstance,
 createProductInstance,
 updateProductInstance,
 deleteProductInstance
};