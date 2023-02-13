const Brand = require('../models/Brand');
const { body, validationResult } = require('express-validator');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');



const getAllBrands = async (req, res) => {
  const brands = await Brand.find().sort('-created_at');
  if ((!brands) || (brands.length < 1)) return res.status(404).json({ "message": "No brands found." });
  res.json(brands);
};


const getBrand = async (req, res) => {
  if (!req?.params?.code) return res.status(400).json({ "message": "Accurate Brand Code required." });

  // const brand = await Brand.findOne({ code: req.params.code }).
  //                           setOptions({ sanitizeFilter: true }).exec();
  // find Brand whose code is same as req.params.code. Otherwise, return null.
  const brand = await Brand.findOne({ code: req.params.code }).exec();
  
  if (!brand) {
    return res.status(404).json({ "message": `No brand matches ID ${req.params.code}.` });
  }
  res.json(brand);
};


const createBrand = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 45 })
    .withMessage('Brand name must be at least 2 and less than 45 characters long.')
    .escape(),
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

    // You may pass an additional check here that generates the code specified below and match it against database (using Brand.findOne()) to see if it already exists to avoid duplicates. if it does not exist, you pass the new generated "code". if it exists, generate a new one and callback the function. until a unique one is generated. This is for when the application grows. This applies to other controllers where custom generated code is needed.

    const brand = await new Brand({
      name: req.body.name,
      code: `${(req.body.name).toLowerCase().replace(/\s+/g, '-')}-${uuid().replaceAll('-', '')}`,
      // code: `${(req.body.name).toLowerCase().replaceAll(' ', '-')}-${format(new Date(), 'yyyyMMddHHmmss')}-${uuid().replaceAll('-', '')}`,
      logo: req.body.logo
    });

    brand.save((err) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(201).json(brand);
    });

    // try {
    //   await brand.save();
    //   res.status(201).json(brand);
    // } catch (err) {
    //   return res.status(404).json(err);
    //   return next(err);
    //   // return next(error = err);
    // }
  }
];


const updateBrand = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 45 })
    .withMessage('Brand name must be at least 2 and less than 45 characters.')
    .escape(),
  body('logo')
    .optional({ checkFalsy: true })
    .trim()
    .escape()  
  ,     
  async (req, res, next) => {
    if (req.body?.code) {req.body.code === null};

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    };

    const brand = await Brand.findOne({ code: req.params.code }).exec();
    if (!brand) {
      return res.status(404).json({ "message": `Your reference ${req.params.code} does not match our brand records.` });
    }
    if (req.body?.name) brand.name = req.body.name;
    brand.code = `${(req.body.name).toLowerCase().replace(/\s+/g, '-')}-${uuid().replaceAll('-', '')}`;
    if (req.body?.logo) brand.logo = req.body.logo;
    // const result = await brand.save();
    // res.json(result);

    const result = await brand.save((err) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.json(result);
    });
  }
];


const deleteBrand = async (req, res) => {
  if (!req?.params?.code) return res.status(400).json({ "message": "Accurate Brand Code required." });

  const brand = await Brand.findOne({ code: req.params.code }).exec();
  if (!brand) {
    return res.status(404).json({ "message": `No brand matches code ${req.params.code}.` });
  };
  const result = await brand.deleteOne();
  res.json(result);

  // const result = await brand.deleteOne((err) => {
  //   if (err) {
  //     return next(err);
  //   }
  //   res.json(result);
  // });
};



module.exports = {
 getAllBrands,
 getBrand,
 createBrand,
 updateBrand,
 deleteBrand
};