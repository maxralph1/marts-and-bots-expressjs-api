const Newsletter = require('../models/Newsletter');
const { body, validationResult } = require('express-validator');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');



const getAllNewsletters = async (req, res) => {
  const newsletters = await Newsletter.find().sort('-created_at');
  if ((!newsletters) || (newsletters.length < 1)) return res.status(404).json({ "message": "No newsletters found" });
};


const getNewsletter = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ "message": "Accurate newsletter ID required" });

  const newsletter = await Newsletter.findOne({ _id: req.params.id }).exec();
  if (!newsletter) {
    return res.status(404).json({ "message": `No newsletter matches the newsletter ID ${req.params.id}`});
  }
  res.json(newsletter);
};


const createNewsletter = [
  body('name')
      .trim()
      .isLength({ max: 45 })
      .withMessage('Name must not be more than 45 characters long.')
      .escape(),
  body('email')
      .trim()
      .isEmail()
      .withMessage('You must provide a valid email address.')
      .isLength({ min: 3, max: 75 })
      .withMessage('Email must not be longer than 75 characters.')
      .escape()
  ,
  async (req, res) => {
    if (req.body?.name) req.body.name;
    if (req.body?.email) req.body.email;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    };

    const duplicateEmail = await Newsletter.findOne({ email: req.body.email }).exec();
    if (duplicateEmail) {
      return res.status(409).json({ "message": `The email ${req.body.email} is already one of our newsletter subscribers` });
    };

    const newsletter = await new Newsletter({
      name: req.body.name,
      email: req.body.email
    });

    newsletter.save((err) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(201).json(newsletter);
    });
  }
];


const updateNewsletter = [
  body('name')
      .trim()
      .isLength({ max: 45 })
      .withMessage('Name must not be more than 45 characters long.')
      .escape(),
  body('email')
      .trim()
      .isEmail()
      .withMessage('You must provide a valid email address.')
      .isLength({ min: 3, max: 75 })
      .withMessage('Email must not be longer than 75 characters.')
      .escape()
  ,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    };

    const newsletter = await Newsletter.findOne({ _id: req.params.id }).exec();
    if (!newsletter) {
      return res.status(404).json({ "message": `The specified newsletter ${req.body.newsletter} does not match our records` });
    };
    if (req.body?.name) newsletter.name = req.body.name;
    if (req.body?.email) newsletter.email = req.body.email;

    const result = await newsletter.save((err) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.json(result);
    });
  }
];


const deleteNewsletter = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ "message": "Accurate newsletter required" });

  const newsletter = await Newsletter.findOne({ _id: req.params.id }).exec();
  if (!newsletter) {
    return res.status(404).json({ "message": `No newsletter matches ${req.params.id}` });
  }
  const result = await newsletter.deleteOne();
  res.json(result);
};



module.exports = {
 getAllNewsletters,
 getNewsletter,
 createNewsletter,
 updateNewsletter,
 deleteNewsletter
};