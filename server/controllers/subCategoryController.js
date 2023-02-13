const SubCategory = require('../models/SubCategory');
const { body, validationResult } = require('express-validator');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');



const getAllSubCategories = async (req, res) => {
  const subCategories = await SubCategory.find().sort('-created_at');
  if ((!subCategories) || (subCategories.length < 1)) return res.status(404).json({ "message": `No sub-categories found.` });
  res.json(subCategories);
};


const getSubCategory = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ "message": "Accurate sub-category name required. "});

  const subCategory = await SubCategory.findOne({ _id: req.params.id }).exec();
  if (!subCategory) {
    return res.status(404).json({ "message": `No sub-category matches the specified sub-category: ${req.params.slug}.`});
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
      .isLength()
      .escape()
      .withMessage('Category must be specified')
  ,
  async (req, res) => {
    if (req.body?.name) req.body.name;
    if (req.body?.category) req.body.category;
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    };

    const duplicateSubCategory = await subCategory.findOne({ 
      name: req.body.name, 
      category: req.body.category 
    }).exec();
    // if this method does not work, use virtual on the model to compare the name and category fields
    if (!duplicateSubCategory) {
      return res.status(404).json({ "message": `Category ${duplicateSubCategory.name} already exists.` });
    };

    const subCategory = await new SubCategory({
      name: req.body.name,
      category: req.body.category
    });

    subCategory.save((ree) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(201).json(subCategory);
    });
  }
];


const updateSubCategory = [
  body('name')
      .trim()
      .isLength()
      .escape()
      .withMessage('Sub-category must be at least 2 and less than 45 caharcters long'),
  body('category')
      .trim()
      .isLength()
      .escape()
      .withMessage('Category must be specified'),
  ,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    };

    const subCategory = await SubCategory.findOne({ _id: req.body.id }).exec();
    if (!subCategory) {
      return res.status(404).json({ "message": `The specified category ${req.body.category.name} does not match our records.` })
    };
    if (req.body?.name) subCategory.name = req.body.name;
    if (req.body?.category) subCategory.category = req.body.category;

    const result = await subCategory.save((err) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.json(result);
    });
  }
];


const deleteSubCategory = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ "message": "Accurate sub-category required" });

  const subCategory = await SubCategory.findOne({ _id: req.params.id }).exec();
  if (!subCategory) {
    return res.status(404).json({ "message": `No sub-category matches ${req.params.id}`});
  };
  const result = await subCategory.deleteOne();
  res.json(result);
};



module.exports = {
 getAllSubCategories,
 getSubCategory,
 createSubCategory,
 updateSubCategory,
 deleteSubCategory
};