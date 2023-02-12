require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dbConnection = require('./config/dbConnect');
const PORT = process.env.PORT || 5000;

// Route imports
const brandRouter = require('./routes/api/brandRoutes');
const categoryRouter = require('./routes/api/categoryRoutes');
const couponRouter = require('./routes/api/couponRoutes');
const currencyRouter = require('./routes/api/currencyRoutes');
const newsletterRouter = require('./routes/api/newsletterRoutes');
const orderRouter = require('./routes/api/orderRoutes');
const paymentRouter = require('./routes/api/paymentRoutes');
const productInstanceRouter = require('./routes/api/productInstanceRoutes');
const productRouter = require('./routes/api/productRoutes');
const ratingRouter = require('./routes/api/ratingRoutes');
const reviewRouter = require('./routes/api/reviewRoutes');
const roleRouter = require('./routes/api/roleRoutes');
const subCategoryRouter = require('./routes/api/subCategoryRoutes');
const userRouter = require('./routes/api/userRoutes');
const wishlistRouter = require('./routes/api/wishlistRoutes');

// Connect to database
dbConnection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Route entries

app.use('/api/brands', brandRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/coupons', couponRouter);
app.use('/api/currencies', currencyRouter);
app.use('/api/newsletters', newsletterRouter);
app.use('/api/orders', orderRouter);
app.use('/api/payments', paymentRouter);
app.use('/api/product-instances', productInstanceRouter);
app.use('/api/products', productRouter);
app.use('/api/ratings', ratingRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/roles', roleRouter);
app.use('/api/sub-categories', subCategoryRouter);
app.use('/api/users', userRouter);
app.use('/api/wishlists', wishlistRouter);



// Final connection

mongoose.connection.once('open', () => {
  console.log('Database connection established.');
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});