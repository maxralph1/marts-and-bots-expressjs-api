const express = require('express');
const router = express.Router();
const subCategoryController = require('../../controllers/subCategoryController');


router.route('/')
    .get(subCategoryController.getAllSubCategories)
    .post(subCategoryController.createSubCategory); 

router.route('/:slug')
    .get(subCategoryController.getSubCategory)
    .put(subCategoryController.updateSubCategory)
    .delete(subCategoryController.deleteSubCategory);


module.exports = router;