const SubCategory = require('../models/SubCategory');
const { body, validationResult } = require('express-validator');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');


const getAllSubCategories = async (req, res) => {
  const subCategories = await SubCategory.find().sort('-createdAt');
  if ((!subCategories) || (subCategories.length < 1)) return res.status(404).json({ "message": `No sub-categories found.` });
  res.json(subCategories);
};

const getSubCategory = async (req, res) => {
  if (!req?.params?.slug) return res.status(400).json({ "message": "Accurate sub-category name required. "});

  const subCategory = await SubCategory.findOne({ slug: req.params.slug }).exec();
  if (!subCategory) {
    return res.status(404).json({ "message": `No sub-category matches the specified category: ${req.params.slug}.`});
  }
  res.json(subCategory);
};

const createSubCategory = [
  body('name')
      .trim()
      .isLength()
      .escape()
      .withMessage('Sub-category must be at least 2 and less than 45 caharcters long'),
  body('category')
      .trim()
      .escape()
  ,
  async (req, res, next) => {
    if (req.body?.name) req.body.name;
    if (req.body?.category) req.body.category;
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    };

    const duplicateSubCategory = await subCategory.findOne({ name: req.body.name }).
                                          where('category').equals(req.body.category).exec();
    if (!duplicateSubCategory) {
      return res.status(404).json({ "message": `Category ${duplicateSubCategory.name} already exists.` });
    };

    const subCategory = await new SubCategory({
      name: req.body.name,
      category: req.body.category
    });

    // let error;
    try {
      await subCategory.save();
    } catch (err) {
      return next(err);
      // return next(error = err);
    }
      
  }
];

const updateSubCategory = async (req, res) => {

};

const deleteSubCategory = async (req, res) => {

};


module.exports = {
 getAllSubCategories,
 getSubCategory,
 createSubCategory,
 updateSubCategory,
 deleteSubCategory
};