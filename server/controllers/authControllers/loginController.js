const User = require('../../models/User');
const { body, validationResult } = require('express-validator');
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
      const accessToken = jwt.sign(
        // { "user": userFound.email || userFound.username },
        { "username": userFound.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: 5 * 60 }
      );
      const refreshToken = jwt.sign(
        // { "user": userFound.email || userFound.username },
        { "username": userFound.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: 60 * 60 }
      );
      // const currentUser = { ...userFound, refreshToken };
      userFound.refresh_token = refreshToken;
      // const result = userFound.save((err) => {
      //   if (err) {
      //     return res.status(400).json(err);
      //   }
      //   res.sendStatus(201);
      // });
      const result = await userFound.save();
      res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
      // Use should only set the sameSite key if the client and server are on different hosts.
      res.json({ accessToken });
      // res.status(200).json({ "message": "User logged in" });
      console.log(result);
    } else {
      return res.status(401).json({ "message": "Aceess denied. Check your credentials."})
    };
  }
];



module.exports = { loginUser };