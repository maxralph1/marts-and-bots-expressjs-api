const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/categoryController');


router.route('/')
    .get(categoryController.getAllCategories)
    .post(categoryController.createCategory)
    .put(categoryController.updateCategory)
    .delete(categoryController.deleteCategory);

router.get('/:id', categoryController.createCategory);


module.exports = router;