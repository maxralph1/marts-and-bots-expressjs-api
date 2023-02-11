const express = require('express');
const router = express.Router();
const subCategoryController = require('../../controllers/subCategoryController');


router.route('/')
    .get(subCategoryController.getAllSubCategories)
    .post(subCategoryController.createSubCategory)
    .put(subCategoryController.updateSubCategory)
    .delete(subCategoryController.deleteSubCategory);

router.get('/:id', subCategoryController.getSubCategory);


module.exports = router;