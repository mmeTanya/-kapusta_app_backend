const express = require('express');
const { ctrlWrapper } = require('../../helpers');
const ctrlAuth = require('./authController');
const { validation, auth } = require('../../middleware');
const { joiSchemas } = require('../user/userModel');

const router = express.Router();

router.post(
  '/register',
  validation(joiSchemas.registerAndLogin),
  ctrlWrapper(ctrlAuth.register),
);

router.post(
  '/login',
  validation(joiSchemas.registerAndLogin),
  ctrlWrapper(ctrlAuth.login),
);

router.get('/google', ctrlWrapper(ctrlAuth.googleAuth));

router.get('/google-redirect', ctrlWrapper(ctrlAuth.googleRedirect));

router.get('/logout', auth, ctrlWrapper(ctrlAuth.logout));

module.exports = router;
