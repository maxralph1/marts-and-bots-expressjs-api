const Order = require('../models/Order');
const { body, validationResult } = require('express-validator');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');



const getAllOrders = async (req, res) => {
  const orders = await Order.find().sort('-created_at');
  if ((!orders) || (orders.length < 1)) return res.status(404).json({ "message": "No orders found" });
  res.json(orders);
};


const getOrder = async (req, res) => {
  if (!req?.params?.ref) return res.status(400).json({ "message": "Accurate order ID required" });

  const order = await Order.findOne({ ref: req.params.ref }).exec();
  if (!order) {
    return res.status(404).json({ "message": `No order matches the order ID ${req.params.ref}` });
  }
  res.json(order);
};


const createOrder = [
  body('ref')
      .trim()
      .escape(),
  body('order_items')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Order item(s) is/are required')
      .isArray()
      .withMessage('Must be list of items')
      .escape(),
  body('shipping_full_name')
      .trim()
      .isLength({ min: 3, max: 100 })
      .withMessage('Must not be between 3-100 characters long')
      .escape(),
  body('shipping_address')
      .trim()
      .isLength({ min: 3, max: 150 })
      .withMessage('Must not be between 3-150 characters long')
      .escape(),
  body('shipping_phone')
      .trim()
      .isMobilePhone()
      .withMessage('Must be a phone number')
      .isLength({ min: 3, max: 30 })
      .withMessage('Must not be between 3-30 characters long')
      .escape(),
  body('shipping_email')
      .trim()
      .isEmail()
      .withMessage('Must be an email')
      .isLength({ min: 3, max: 150 })
      .withMessage('Must not be between 3-150 characters long')
      .escape(),
  body('shipping_city')
      .trim()
      .isLength({ min: 3, max: 150 })
      .withMessage('Must not be between 3-150 characters long')
      .escape(),
  body('shipping_postal_code')
      .trim()
      .isLength({ min: 3, max: 15 })
      .withMessage('Must not be between 3-15 characters long')
      .escape(),
  body('shipping_country')
      .trim()
      .isLength({ min: 3, max: 45 })
      .withMessage('Must not be between 3-45 characters long')
      .escape(),
  body('shipping_location_latitude')
      .trim()
      .isLength({ min: 3, max: 15 })
      .withMessage('Must not be between 3-15 characters long')
      .escape(),
  body('shipping_location_longitude')
      .trim()
      .isLength({ min: 3, max: 15 })
      .withMessage('Must not be between 3-15 characters long')
      .escape(),
  body('shipping_location_plus_code')
      .trim()
      .isLength({ min: 3, max: 15 })
      .withMessage('Must not be between 3-15 characters long')
      .escape(),
  body('items_price')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Item(s) price is required')
      .escape(),
  body('shipping_cost')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Shipping cost is required')
      .escape(),
  body('vat')
      .trim()
      .isLength({ min: 1 })
      .withMessage('VAT is required')
      .escape(),
  body('total_price')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Total price is required')
      .escape(),
  body('payment')
      .trim()
      .escape(),
  body('user')
      .trim()
      .isLength({ min: 1 })
      .withMessage('User is required')
      .escape(),
  body('coupon')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Coupon is required')
      .escape(),
  body('is_delivered')
      .trim()
      .isBoolean()
      .withMessage('Must be true or false')
      .escape(),
  body('return_order')
      .trim()
      .isBoolean()
      .withMessage('Must be true or false')
      .escape(),
  async (req, res) => {
    if (req.body?.ref) req.body.ref = null;
    if ([req.body?.order_items]) [req.body.order_items];
    if (req.body?.shipping_full_name) req.body.shipping_full_name;
    if (req.body?.shipping_address) req.body.shipping_address;
    if (req.body?.shipping_phone) req.body.shipping_phone;
    if (req.body?.shipping_email) req.body.shipping_email;
    if (req.body?.shipping_city) req.body.shipping_city;
    if (req.body?.shipping_postal_code) req.body.shipping_postal_code;
    if (req.body?.shipping_country) req.body.shipping_country;
    if (req.body?.shipping_location_latitude) req.body.shipping_location_latitude;
    if (req.body?.shipping_location_longitude) req.body.shipping_location_longitude;
    if (req.body?.shipping_location_plus_code) req.body.shipping_location_plus_code;
    if (req.body?.items_price) req.body.items_price;
    if (req.body?.shipping_cost) req.body.shipping_cost;
    if (req.body?.vat) req.body.vat;
    if (req.body?.total_price) req.body.total_price;
    if (req.body?.payment) req.body.payment;
    if (req.body?.user) req.body.user;
    if (req.body?.coupon) req.body.coupon;
    if (req.body?.is_delivered) req.body.is_delivered;
    if (req.body?.return_order) req.body.return_order;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    };

    const order = await new Order({
      ref: `${(req.body.name).toLowerCase().replace(/\s+/g, '-')}-${uuid().replaceAll('-', '')}`,
      order_items: [req.body.order_items],
      shipping_address: {
        full_name: req.body.shipping_full_name,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        city: req.body.city,
        postal_code: req.body.postal_code,
        country: req.body.country,
        location: {
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          plus_code: req.body.plus_code,
        }
      },
      items_price: req.body.items_price,
      shipping_cost: req.body.shipping_cost,
      vat: req.body.vat,
      total_price: req.body.total_price,
      payment: req.body.payment,
      user: req.body.user,
      coupon: req.body.coupon,
      is_delivered: req.body.is_delivered,
      return_order: req.body.return_order,
    });

    order.save((err) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(201).json(order);
    });
  }
];


const updateOrder = [
  body('ref')
      .trim()
      .escape(),
  body('order_items')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Order item(s) is/are required')
      .isArray()
      .withMessage('Must be list of items')
      .escape(),
  body('shipping_full_name')
      .trim()
      .isLength({ min: 3, max: 100 })
      .withMessage('Must not be between 3-100 characters long')
      .escape(),
  body('shipping_address')
      .trim()
      .isLength({ min: 3, max: 150 })
      .withMessage('Must not be between 3-150 characters long')
      .escape(),
  body('shipping_phone')
      .trim()
      .isMobilePhone()
      .withMessage('Must be a phone number')
      .isLength({ min: 3, max: 30 })
      .withMessage('Must not be between 3-30 characters long')
      .escape(),
  body('shipping_email')
      .trim()
      .isEmail()
      .withMessage('Must be an email')
      .isLength({ min: 3, max: 150 })
      .withMessage('Must not be between 3-150 characters long')
      .escape(),
  body('shipping_city')
      .trim()
      .isLength({ min: 3, max: 150 })
      .withMessage('Must not be between 3-150 characters long')
      .escape(),
  body('shipping_postal_code')
      .trim()
      .isLength({ min: 3, max: 15 })
      .withMessage('Must not be between 3-15 characters long')
      .escape(),
  body('shipping_country')
      .trim()
      .isLength({ min: 3, max: 45 })
      .withMessage('Must not be between 3-45 characters long')
      .escape(),
  body('shipping_location_latitude')
      .trim()
      .isLength({ min: 3, max: 15 })
      .withMessage('Must not be between 3-15 characters long')
      .escape(),
  body('shipping_location_longitude')
      .trim()
      .isLength({ min: 3, max: 15 })
      .withMessage('Must not be between 3-15 characters long')
      .escape(),
  body('shipping_location_plus_code')
      .trim()
      .isLength({ min: 3, max: 15 })
      .withMessage('Must not be between 3-15 characters long')
      .escape(),
  body('items_price')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Item(s) price is required')
      .escape(),
  body('shipping_cost')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Shipping cost is required')
      .escape(),
  body('vat')
      .trim()
      .isLength({ min: 1 })
      .withMessage('VAT is required')
      .escape(),
  body('total_price')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Total price is required')
      .escape(),
  body('payment')
      .trim()
      .escape(),
  body('user')
      .trim()
      .isLength({ min: 1 })
      .withMessage('User is required')
      .escape(),
  body('coupon')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Coupon is required')
      .escape(),
  body('is_delivered')
      .trim()
      .isBoolean()
      .withMessage('Must be true or false')
      .escape(),
  body('return_order')
      .trim()
      .isBoolean()
      .withMessage('Must be true or false')
      .escape()
  ,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    };

    const order = await Order.findOne({ slug: req.params.slug }).exec();
    if (!order) {
      return res.status(404).json({ "message": `The specified order ${req.params.slug} does not match our records` });
    };

    if (req.body?.ref) {
      return res.status(401).json({ 'message': "Unauthorized operation" });
    }
    if ([req.body?.order_items]) order.order_items.product_choice = [req.body.order_items];
    if (req.body?.shipping_full_name) order.shipping_address.full_name = req.body.shipping_full_name;
    if (req.body?.shipping_address) order.shipping_address.address = req.body.shipping_address;
    if (req.body?.shipping_phone) order.shipping_address.phone = req.body.shipping_phone;
    if (req.body?.shipping_email) order.shipping_address.email = req.body.shipping_email;
    if (req.body?.shipping_city) order.shipping_address.city = req.body.shipping_city;
    if (req.body?.shipping_postal_code) order.shipping_address.postal_code = req.body.shipping_postal_code;
    if (req.body?.shipping_country) order.shipping_address.country = req.body.shipping_country;
    if (req.body?.shipping_location_latitude) order.shipping_address.location.latitude = req.body.shipping_location_latitude;
    if (req.body?.shipping_location_longitude) order.shipping_address.location.longitude = req.body.shipping_location_longitude;
    if (req.body?.shipping_location_plus_code) order.shipping_address.location.plus_code = req.body.shipping_location_plus_code;
    if (req.body?.items_price) order.items_price = req.body.items_price;
    if (req.body?.shipping_cost) order.shipping_cost = req.body.shipping_cost;
    if (req.body?.vat) order.vat = req.body.vat;
    if (req.body?.total_price) order.total_price = req.body.total_price;
    if (req.body?.payment) order.payment = req.body.payment;
    if (req.body?.user) order.user = req.body.user;
    if (req.body?.coupon) order.coupon = req.body.coupon;
    if (req.body?.is_delivered) order.is_delivered = req.body.is_delivered;
    if (req.body?.return_order) order.return_order = req.body.return_order;

    const result = await order.save((err) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.json(result);
    });
  }
];


const deleteOrder = async (req, res) => {
  if (!req?.params?.ref) return res.status(400).json({ "message": "Accurate product required" });

  const order = await Order.findOne({ ref: req.params.ref }).exec();
  if (!order) {
    return res.status(404).json({ "message": `No order matches ${req.params.ref}` });
  }
  const result = await order.deleteOne();
  res.json(result);
};



module.exports = {
 getAllOrders,
 getOrder,
 createOrder,
 updateOrder,
 deleteOrder
};