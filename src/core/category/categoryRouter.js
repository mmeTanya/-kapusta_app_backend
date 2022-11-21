const express = require('express');
const { ctrlWrapper } = require('../../helpers');
const ctrlCategory = require('./categoryController');
const { validation, auth, checkRoles } = require('../../middleware');
const { joiSchemas } = require('./categoryModel');

const router = express.Router();

router.post(
  '/',
  auth,
  validation(joiSchemas.add),
  ctrlWrapper(ctrlCategory.addCategory),
);

router.get('/', auth, ctrlWrapper(ctrlCategory.getCategoryList));

router.delete(
  '/:categoryId',
  auth,
  validation(joiSchemas.deleteAndUpdate, 'params'),
  ctrlWrapper(ctrlCategory.deleteCategory),
);

router.patch(
  '/:categoryId',
  auth,
  validation(joiSchemas.update),
  validation(joiSchemas.deleteAndUpdate, 'params'),
  checkRoles(['ADMIN']),
  ctrlWrapper(ctrlCategory.updateDefault),
);

module.exports = router;
