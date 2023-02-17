const User = require('../../models/User');
const { body, validationResult } = require('express-validator');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');



const registerUser = [
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
    if (req.body?.language) req.body.language;
    if (req.body?.roles) req.body.roles;
    if (req.body?.email_verified_at) req.body.email_verified_at = null;
    if (req.body?.display_mode) req.body.display_mode = null;
    if (req.body?.refresh_token) req.body.refresh_token = null;
    if (req.body?.is_deleted) req.body.is_deleted = null;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    };

    const duplicateUsername = await User.findOne({ username: req.body.username }).exec();
    if (duplicateUsername) {
      return res.status(409).json({ "message": `Username ${duplicateUsername.username} has already been taken` });
    }

    const duplicateEmail = await User.findOne({ email: req.body.email }).exec();
    if (duplicateEmail) {
      return res.status(409).json({ "message": `Email ${duplicateEmail.email} is already registered` });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await new User({
      username: req.body.username,
      password: hashedPassword,
      first_name: req.body.first_name,
      other_names: req.body.other_names,
      last_name: req.body.last_name,
      company_name: req.body.company_name,
      profile_image: req.body.profile_image,
      description: req.body.description,
      phone: req.body.phone,
      email: req.body.email,
      language: req.body.language,
      roles: req.body.roles
    });

    user.save((err) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(201).json({ "message": `User successfully created`, "user_details": user });
    });
  }
];



module.exports = { registerUser };