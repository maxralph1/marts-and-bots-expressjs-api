const User = require('../../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();



const refreshTokenHandler = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  // console.log(cookies.jwt);
  const refreshToken = cookies.jwt;
   
  const userFound = await User.findOne({ refresh_token: refreshToken }).exec();

  if (!userFound) return res.sendStatus(403);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      // console.log(decoded)
      if (err || userFound.username !== decoded.username) return res.sendStatus(403);
      const roles = Object.values(userFound.roles);
      const accessToken = jwt.sign(
        { 
          "userInfo": 
            {
              "username": decoded.username,
              "roles": roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: 10 * 60 }
      );
      res.json({ accessToken })
    }
  );
};



module.exports = { refreshTokenHandler };