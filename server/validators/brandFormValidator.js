const { body, validationResult } = require('express-validator');

let createBrandFormValidator = (req, res, next) => {
  body('name')
    .trim()
    .isLength({ min: 2, max: 45 })
    .escape()
    .withMessage('Brand name must be specified.')
    .isAlphanumeric()
    .withMessage('Brand name has non-alphanumeric characters.'),
  body('logo')
    .trim()
    .escape();

  next();
};

const updateBrandFormValidator = () => {

};


module.exports = {
  createBrandFormValidator,
  updateBrandFormValidator
}