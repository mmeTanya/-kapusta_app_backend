const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userService = require('../../user/userService');
const { createError } = require('../../../helpers');
const { JWT_ACCESS_SECRET, JWT_ACCESS_EXPIRE_TIME } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw createError(403, 'Email or password wrong');
  }
  const passCompare = bcrypt.compareSync(password, user.password);
  if (!passCompare) {
    throw createError(403, 'Email or password wrong');
  }
  const payload = {
    id: user._id,
    roles: user.roles,
  };
  const token = jwt.sign(payload, JWT_ACCESS_SECRET, {
    expiresIn: JWT_ACCESS_EXPIRE_TIME,
  });

  await userService.updateUserById(user._id, token);

  res.status(200).json({
    message: 'Authentification Success',
    token,
  });
};

module.exports = login;
