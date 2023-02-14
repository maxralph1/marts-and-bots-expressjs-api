const User = require('../../models/User');
const { body, validationResult } = require('express-validator');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');



const loginUser = [
  body('username_email')
      .trim()
      .escape(),
  body('password')
      .trim()
      .escape(),
  ,
  async (req, res) => {
    if (req.body?.username_email) req.body.username_email;
    if (req.body?.password) req.body.password;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    };

    const loginSuccess = await User.findOne({ username: req.body.username }).exec();
    if (loginSuccess) {
      return res.status(400).json({ "message": `Username ${duplicateUsername} has already been taken` });
    }

    const user = await new User({
      username: req.body.username,
      first_name: req.body.first_name,
      other_names: req.body.other_names,
      last_name: req.body.last_name,
      company_name: req.body.company_name,
      profile_image: req.body.profile_image,
      description: req.body.description,
      phone: req.body.phone,
      email: req.body.email,
    });

    user.save((err) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(201).json(user);
    });
  }
];



module.exports = loginUser;