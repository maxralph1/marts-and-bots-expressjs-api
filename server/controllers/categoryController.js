const Category = require('../models/Category');
const { body, validationResult } = require('express-validator');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');



const getAllCategories = async (req, res) => {
  const categories = await Category.find().sort('-created_at');
  if ((!categories) || (categories.length < 1)) return res.status(404).json({ "message": "No categories found" });
  res.json(categories);
};


const getCategory = async (req, res) => {
  if (!req?.params?.slug) return res.status(400).json({ "message": "Accurate category name required. "});

  const category = await Category.findOne({ slug: req.params.slug }).exec();
  if (!category) {
    return res.status(404).json({ "message": `No category matches the parameter ${req.params.slug}. `});
  }
  res.json(category);
};


const createCategory = [ 
  body('name')
      .trim()
      .isLength({ min: 2, max: 45 })
      .withMessage('Category must be at least 2 and less than 45 characters long.')
      .escape(),
  body('description')
      .optional({ checkFalsy: true })
      .trim()
      .escape()
  ,
  async (req, res) => {
    if (req.body?.name) req.body.name;
    if (req.body?.slug) req.body.slug = null;
    if (req.body?.description) req.body.description;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    };

    const duplicateCategory = await Category.findOne({ name: req.body.name }).exec();
    if (duplicateCategory) {
      return res.status(409).json({ "message": `Category ${duplicateCategory.name} already exists.` });
    };

    const category = await new Category({
      name: req.body.name,
      slug: (req.body.name).toLowerCase().replace(/\s+/g, '-'),
      description: req.body.description
    });

    category.save((err) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(201).json(category);
    });
  }
];


const updateCategory = [ 
  body('name')
      .trim()
      .isLength({ min: 2, max: 45 })
      .withMessage('Category name must be at least 2 and less than 45 characters.')
      .escape(),
  body('description')
      .optional()
      .trim()
      .escape()
  ,
  async (req, res) => {
    if (req.body?.slug) req.body.slug = null;
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    };

    const category = await Category.findOne({ slug: req.params.slug }).exec();
    if (!category) {
      return res.status(404).json({ "message": `Your reference ${req.params.slug} does not match our category records.` });
    };
    if (req.body?.name) category.name = req.body.name;
    category.slug = (req.body.name).toLowerCase().replace(/\s+/g, '-');
    if (req.body?.description) category.description = req.body.description;

    const result = await category.save((err) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.json(result);
    });
  }
];


const deleteCategory = async (req, res) => {
  if (!req?.params?.slug) return res.status(400).json({ "message": "Accurate category required" });

  const category = await Category.findOne({ slug: req.params.slug }).exec();
  if (!category) {
    return res.status(404).json({ "message": `No category matches ${req.params.slug}` });
  };
  const result = await category.deleteOne();
  res.json(result);
};



module.exports = {
 getAllCategories,
 getCategory,
 createCategory,
 updateCategory,
 deleteCategory
};