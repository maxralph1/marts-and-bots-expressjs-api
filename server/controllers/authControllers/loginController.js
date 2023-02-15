const User = require('../../models/User');
const { body, validationResult } = require('express-validator');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();



const loginUser = [
  body('username_email')
      .trim()
      .escape(),
  body('password')
      .trim()
      .escape()
  ,
  async (req, res) => {
    if (req.body?.username_email) req.body.username_email;
    if (req.body?.password) req.body.password;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    };

    const userFound = await User.findOne({$or: [{email: req.body.username_email}, {username: req.body.username_email}]}).exec();

    if(!userFound) return res.status(401).json({ "message": "Access denied. Check your credentials." });

    const password = (req.body.password).trim();
    const match = await bcrypt.compare(password, userFound.password);

    if (match) {
      return res.status(200).json({ "message": "User logged in" });
    } else {
      return res.status(401).json({ "message": "Aceess denied. Check your credentials."})
    };
  }
];



module.exports = { loginUser };