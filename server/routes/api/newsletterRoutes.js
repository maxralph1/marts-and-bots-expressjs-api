const express = require('express');
const router = express.Router();
const newsletterController = require('../../controllers/newsletterController');


router.route('/')
    .get(newsletterController.getAllNewsletters)
    .post(newsletterController.createNewsletter)
    .put(newsletterController.updateNewsletter)
    .delete(newsletterController.deleteNewsletter);

router.get('/:id', newsletterController.getNewsletter);


module.exports = router;