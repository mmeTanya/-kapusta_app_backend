const express = require('express');
const { ctrlWrapper } = require('../../helpers');
const ctrlReport = require('./reportController');
const { auth, validation } = require('../../middleware');
const { joiSchemas } = require('../transaction/transactionModel');

const router = express.Router();

router.get(
  '/',
  auth,
  validation(joiSchemas.getReport, 'query'),
  ctrlWrapper(ctrlReport.getFullReportByMonth),
);
router.get(
  '/monthly-income',
  auth,
  validation(joiSchemas.getReport, 'query'),
  ctrlWrapper(ctrlReport.getIncomeReportByMonth),
);
router.get(
  '/monthly-expenses',
  auth,
  validation(joiSchemas.getReport, 'query'),
  ctrlWrapper(ctrlReport.getExpenseReportByMonth),
);

module.exports = router;
