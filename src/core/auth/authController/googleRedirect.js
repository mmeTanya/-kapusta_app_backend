const queryString = require('query-string');
const axios = require('axios');
const bcrypt = require('bcrypt');
const userService = require('../../user/userService');
const roleService = require('../../role/roleService');
const categoryService = require('../../category/categoryService');
const { createError } = require('../../../helpers');

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;
  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL}/api/auth/google-redirect`,
      grant_type: 'authorization_code',
      code,
    },
  });

  const userData = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  const { id, email } = userData.data;
  const user = await userService.getUserByEmail(email);
  const name = email.slice(0, email.indexOf('@'));

  if (!user) {
    const hashPassword = await bcrypt.hash(id, Number(process.env.HASH_POWER));
    const userRole = await roleService.getRoleByName('USER');
    const categories = await categoryService.getDefaultCategory();
    const newUser = await userService.addUser({
      email,
      password: hashPassword,
      roles: [userRole.name],
      name,
      categories,
    });

    const token = newUser.createToken();
    await userService.updateUserTokenById(newUser._id, token);

    return res.redirect(
      `${process.env.FRONTEND_URL}/google-redirect?token=${token}`,
    );
  }

  const isValidPassword = await bcrypt.compare(id, user.password);
  if (!isValidPassword) {
    throw createError(403, 'Not registered');
  }

  const token = user.createToken();

  await userService.updateUserTokenById(user._id, token);

  return res.redirect(
    `${process.env.FRONTEND_URL}/google-redirect?token=${token}`,
  );
};

module.exports = googleRedirect;
