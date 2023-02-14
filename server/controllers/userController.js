const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');



const getAllUsers = async (req, res) => {
  const users = await User.find().sort('-created_at');
  if ((!users) || (users.length < 1)) return res.status(404).json({ "message": "No users found" });
};


const getUser = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ "message": "Accurate user ID required" });

  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res.status(404).json({ "message": `No user matches the user ID ${req.params.id}` });
  }
  res.json(user);
};


const createUser = [
  body('username')
      .trim()
      .isLength({ min: 3, max: 45 })
      .withMessage('Username must be exactly between 3-45 characters long.')
      .isAlphanumeric()
      .withMessage('Username must be alphanumeric')
      .escape(),
  body('password')
      .trim()
      .isLength({ min: 10 })
      .withMessage('Password must not be less than 10 characters long.')
      .isLength({ max: 45 })
      .withMessage('Password must not be more than 45 characters long.')
      .escape(),
  body('first_name')
      .trim()
      .isLength({ max: 45 })
      .withMessage('First name must not be more than 45 characters long.')
      .escape(),
  body('other_names')
      .trim()
      .optional({ checkFalsy: true })
      .isLength({ max: 45 })
      .withMessage('Other names must not be more than 45 characters long.')
      .escape(),
  body('last_name')
      .trim()
      .isLength({ max: 45 })
      .withMessage('Last name must not be more than 45 characters long.')
      .escape(),
  body('company_name')
      .trim()
      .optional({ checkFalsy: true })
      .isLength({ max: 150 })
      .withMessage('Company name must not be more than 150 characters long.')
      .escape(),
  body('profile_image')
      .trim()
      .optional({ checkFalsy: true })
      .escape(),
  body('description')
      .trim()
      .optional({ checkFalsy: true })
      .escape(),
  body('phone')
      .trim()
      .optional({ checkFalsy: true })
      .isMobilePhone()
      .withMessage('Must be a phone number')
      .escape(),
  body('email')
      .trim()
      .optional({ checkFalsy: true })
      .isEmail()
      .withMessage('Must be an email')
      .escape(),
  body('email_verified_at')
      .trim()
      .optional({ checkFalsy: true })
      .isDate()
      .withMessage('Must be a valid date')
      .escape(),
  body('roles')
      .trim()
      .escape(),
  body('display_mode')
      .trim()
      .isBoolean()
      .withMessage('Must be dark or light')
      .escape(),
  body('language')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Must not be empty')
      .escape(),
  body('is_deleted')
      .trim()
      .isBoolean()
      .withMessage('Must be dark or light')
      .escape()
  ,
  async (req, res) => {
    if (req.body?.username) req.body.username;
    if (req.body?.password) req.body.password;
    if (req.body?.first_name) req.body.first_name;
    if (req.body?.other_names) req.body.other_names;
    if (req.body?.last_name) req.body.last_name;
    if (req.body?.company_name) req.body.company_name;
    if (req.body?.profile_image) req.body.profile_image;
    if (req.body?.description) req.body.description;
    if (req.body?.phone) req.body.phone;
    if (req.body?.email) req.body.email;
    if (req.body?.email_verified_at) req.body.email_verified_at;
    if (req.body?.roles) req.body.roles;
    if (req.body?.display_mode) req.body.display_mode;
    if (req.body?.language) req.body.language;
    if (req.body?.is_deleted) req.body.is_deleted;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    };

    const duplicateUsername = await User.findOne({ username: req.body.username }).exec();
    if (duplicateUsername) {
      return res.status(400).json({ "message": `Username ${duplicateUsername} has already been taken` });
    }

    const duplicateEmail = await User.findOne({ email: req.body.email }).exec();
    if (duplicateEmail) {
      return res.status(400).json({ "message": `Email ${duplicateEmail} is already registered` });
    }

    const user = await new User({
      username: req.body.username,
      password: req.body.password,
      first_name: req.body.first_name,
      other_names: req.body.other_names,
      last_name: req.body.last_name,
      company_name: req.body.company_name,
      profile_image: req.body.profile_image,
      description: req.body.description,
      phone: req.body.phone,
      email: req.body.email,
      email_verified_at: req.body.email_verified_at,
      roles: req.body.roles,
      display_mode: req.body.display_mode,
      language: req.body.language,
      is_deleted: req.body.is_deleted
    });

    user.save((err) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(201).json(user);
    });
  }
];


const updateUser = [
  body('username')
      .trim()
      .isLength({ min: 3, max: 45 })
      .withMessage('Username must be exactly between 3-45 characters long.')
      .isAlphanumeric()
      .withMessage('Username must be alphanumeric')
      .escape(),
  body('password')
      .trim()
      .isLength({ min: 10 })
      .withMessage('Password must not be less than 10 characters long.')
      .isLength({ max: 45 })
      .withMessage('Password must not be more than 45 characters long.')
      .escape(),
  body('first_name')
      .trim()
      .isLength({ max: 45 })
      .withMessage('First name must not be more than 45 characters long.')
      .escape(),
  body('other_names')
      .trim()
      .optional({ checkFalsy: true })
      .isLength({ max: 45 })
      .withMessage('Other names must not be more than 45 characters long.')
      .escape(),
  body('last_name')
      .trim()
      .isLength({ max: 45 })
      .withMessage('Last name must not be more than 45 characters long.')
      .escape(),
  body('company_name')
      .trim()
      .optional({ checkFalsy: true })
      .isLength({ max: 150 })
      .withMessage('Company name must not be more than 150 characters long.')
      .escape(),
  body('profile_image')
      .trim()
      .optional({ checkFalsy: true })
      .escape(),
  body('description')
      .trim()
      .optional({ checkFalsy: true })
      .escape(),
  body('phone')
      .trim()
      .optional({ checkFalsy: true })
      .isMobilePhone()
      .withMessage('Must be a phone number')
      .escape(),
  body('email')
      .trim()
      .optional({ checkFalsy: true })
      .isEmail()
      .withMessage('Must be an email')
      .escape(),
  body('email_verified_at')
      .trim()
      .optional({ checkFalsy: true })
      .isDate()
      .withMessage('Must be a valid date')
      .escape(),
  body('roles')
      .trim()
      .escape(),
  body('display_mode')
      .trim()
      .isBoolean()
      .withMessage('Must be dark or light')
      .escape(),
  body('language')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Must not be empty')
      .escape(),
  body('is_deleted')
      .trim()
      .isBoolean()
      .withMessage('Must be dark or light')
      .escape()
  ,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    };

    const user = await User.findOne({ _id: req.body.username }).exec();
    if (!user) {
      return res.status(404).json({ "message": `The specified user ${req.body.user} does not match our records` });
    };
    if (req.body?.username) user.username = req.body.username;
    if (req.body?.password) user.password = req.body.password;
    if (req.body?.first_name) user.first_name = req.body.first_name;
    if (req.body?.other_names) user.other_names = req.body.other_names;
    if (req.body?.last_name) user.last_name = req.body.last_name;
    if (req.body?.company_name) user.company_name = req.body.company_name;
    if (req.body?.profile_image) user.profile_image = req.body.profile_image;
    if (req.body?.description) user.description = req.body.description;
    if (req.body?.phone) user.phone = req.body.phone;
    if (req.body?.email) user.email = req.body.email;
    if (req.body?.email_verified_at) user.email_verified_at = req.body.email_verified_at;
    if (req.body?.roles) user.roles = req.body.roles;
    if (req.body?.display_mode) user.display_mode = req.body.display_mode;
    if (req.body?.language) user.language = req.body.language;
    if (req.body?.is_deleted) user.is_deleted = req.body.is_deleted;

    const result = await user.save((err) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.json(result);
    });
  }
];


const deleteUser = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ "message": "Accurate user required" });

  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res.status(404).json({ "message": `No user matches ${req.params.id}` });
  }
  const result = await user.deleteOne();
  res.json(result);
};



module.exports = {
 getAllUsers,
 getUser,
 createUser,
 updateUser,
 deleteUser
};