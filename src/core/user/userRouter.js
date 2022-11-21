const express = require('express');
const { ctrlWrapper } = require('../../helpers');
const ctrlUser = require('./userController');
const { validation, auth } = require('../../middleware');
const { joiSchemas } = require('./userModel');

const router = express.Router();

router.patch(
  '/balance',
  auth,
  validation(joiSchemas.balance),
  ctrlWrapper(ctrlUser.updateBalance),
);

router.get('/', auth, ctrlWrapper(ctrlUser.currentUser));
router.delete('/', auth, ctrlWrapper(ctrlUser.deleteUser));

module.exports = router;
