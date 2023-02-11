const Brand = require('../models/Brand');
const { body, validationResult } = require('express-validator');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');



const getAllBrands = async (req, res) => {
  const brands = await Brand.find().sort('-createdAt');
  if ((!brands) || (brands.length < 1)) return res.status(204).json({ "message": "No brands found." });
  res.json(brands);
};


const getBrand = async (req, res) => {
  if (!req?.params?.code) return res.status(400).json({ 'message': 'Accurate Brand Code required.' });

  const brand = await Brand.findOne({ code: req.params.code }).exec();
  if (!brand) {
    return res.status(204).json({ "message": `No brand matches ID ${req.params.code}.` });
  }
  res.json(brand);
};


const createBrand = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 45 })
    .escape()
    .withMessage('Brand name must be more than 2 and less than 45 characters.'),
  body('logo')
    .optional({ checkFalsy: true })
    .trim()
    .escape()
  , 
  async (req, res, next) => {
    if (req.body?.name) req.body.name;
    if (req.body?.code) {req.body.code === null};
    if (req.body?.logo) req.body.logo;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    };

    const brand = await new Brand({
      name: req.body.name,
      code: `${format(new Date(), 'yyyyMMddHHmmss')}%${uuid().replaceAll('-', '%')}%${(req.body.name).toLowerCase().replaceAll(' ', '%')}`,
      logo: req.body.logo
    });

    brand.save((err) => {
      if (err) {
        return next(err);
      }
      res.status(201).json(brand);
    });
  }
];


const updateBrand = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 45 })
    .escape()
    .withMessage('Brand name must be more than 2 and less than 45 characters.'),
  body('logo')
    .optional({ checkFalsy: true })
    .trim()
    .escape()  
  ,     
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    };

    const brand = await Brand.findOne({ code: req.params.code }).exec();
    if (!brand) {
      return res.status(204).json({ "message": `Your reference ${req.body.code} does not match our brand records.` });
    }
    if (req.body?.name) brand.name = req.body.name;
    if (req.body?.code) (!brand.logo);
    if (req.body?.logo) brand.logo = req.body.logo;
    const result = await brand.save();
    res.json(result);
  }
];


const deleteBrand = async (req, res) => {
  if (!req?.params?.code) return res.status(400).json({ 'message': 'Brand code required.' });

  const brand = await Brand.findOne({ code: req.params.code }).exec();
  if (!brand) {
    return res.status(204).json({ "message": `No brand matches code ${req.params.code}.` });
  }
  res.json(brand);
};



module.exports = {
 getAllBrands,
 getBrand,
 createBrand,
 updateBrand,
 deleteBrand
};