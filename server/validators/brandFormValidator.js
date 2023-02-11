const { body, validationResult } = require('express-validator');

let createBrandFormValidator = () => {
  body('name')
    .trim()
    .isLength({ min: 2, max: 45 })
    .escape()
    .withMessage('Brand name must be specified.')
    .isAlphanumeric()
    .withMessage('Brand name has non-alphanumeric characters.'),
  body('logo')
    .trim()
    .escape()
};

const updateBrandFormValidator = () => {

};


module.exports = {
  createBrandFormValidator,
  updateBrandFormValidator
}