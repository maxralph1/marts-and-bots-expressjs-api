const express = require('express');
const router = express.Router();
const newsletterController = require('../../controllers/newsletterController');


router.route('/')
    .get(newsletterController.getAllNewsletters)
    .post(newsletterController.createNewsletter);

router.route('/:id')
    .get(newsletterController.getNewsletter)
    .put(newsletterController.updateNewsletter)
    .delete(newsletterController.deleteNewsletter);


module.exports = router;