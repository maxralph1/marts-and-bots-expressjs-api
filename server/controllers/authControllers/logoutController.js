const User = require('../../models/User');



const logoutUser = async (req, res) => {
  // You should also delete the access token on the client side
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  // console.log(cookies.jwt);
  const refreshToken = cookies.jwt;
   
  const userFound = await User.findOne({ refresh_token: refreshToken }).exec();

  // if (!userFound) return res.sendStatus(403);
  if (!userFound) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    return res.sendStatus(204);
  };

  userFound.refresh_token = '';
  const result = await userFound.save();
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  res.status(204).json(result);
  console.log(result);

  // res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  // res.sendStatus(204);
};



module.exports = { logoutUser };