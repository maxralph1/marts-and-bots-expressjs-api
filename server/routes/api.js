const express = require('express');
const router = express.Router();


// // Use this for the API documentation/directions
// router.get('^/$|/index(.html)?', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
// });


// Route entry points imports

const authRouter = require('../routes/apiRoutes/authRoutes');
const brandRouter = require('../routes/apiRoutes/brandRoutes');
const categoryRouter = require('../routes/apiRoutes/categoryRoutes');
const couponRouter = require('../routes/apiRoutes/couponRoutes');
const currencyRouter = require('../routes/apiRoutes/currencyRoutes');
const newsletterRouter = require('../routes/apiRoutes/newsletterRoutes');
const orderRouter = require('../routes/apiRoutes/orderRoutes');
const paymentRouter = require('../routes/apiRoutes/paymentRoutes');
const productInstanceRouter = require('../routes/apiRoutes/productInstanceRoutes');
const productRouter = require('../routes/apiRoutes/productRoutes');
const ratingRouter = require('../routes/apiRoutes/ratingRoutes');
const reviewRouter = require('../routes/apiRoutes/reviewRoutes');
const roleRouter = require('../routes/apiRoutes/roleRoutes');
const subCategoryRouter = require('../routes/apiRoutes/subCategoryRoutes');
const userRouter = require('../routes/apiRoutes/userRoutes');
const wishlistRouter = require('../routes/apiRoutes/wishlistRoutes');



// Route entry points

router.use('/auth', authRouter);
router.use('/brands', brandRouter);
router.use('/categories', categoryRouter);
router.use('/coupons', couponRouter);
router.use('/currencies', currencyRouter);
router.use('/newsletters', newsletterRouter);
router.use('/orders', orderRouter);
router.use('/payments', paymentRouter);
router.use('/product-instances', productInstanceRouter);
router.use('/products', productRouter);
router.use('/ratings', ratingRouter);
router.use('/reviews', reviewRouter);
router.use('/roles', roleRouter);
router.use('/sub-categories', subCategoryRouter);
router.use('/users', userRouter);
router.use('/wishlists', wishlistRouter);




module.exports = router;