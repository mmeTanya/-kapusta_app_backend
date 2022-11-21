const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Joi = require('joi');

const { Schema, model } = mongoose;

const dateRegexp =
  /^(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)$/;

const transactionSchema = new Schema(
  {
    date: {
      type: String,
      validate: dateRegexp,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'category',
    },
    value: {
      type: Number,
      required: true,
      default: 0,
    },
    type: {
      type: String,
      required: true,
      enum: {
        values: ['expenses', 'income'],
        message:
          "{VALUE} is not supported, have to choose between 'expenses' or 'income' ",
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
);

const addTransactionSchema = Joi.object({
  date: Joi.string()
    .pattern(dateRegexp)
    .required()
    .error(errors => {
      errors.forEach(err => {
        console.log(err.code);
        switch (err.code) {
          case 'any.required':
            err.message = 'Value date should not be empty!';
            break;
          case 'string.pattern.base':
            err.message = `Value date should have be correct!`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  description: Joi.string().min(2).max(100).required(),
  value: Joi.number().required(),
  type: Joi.string().valid('expenses', 'income').required(),
  category: Joi.string()
    .custom((value, helpers) => {
      const isValidObjectId = mongoose.Types.ObjectId.isValid(value);
      if (!isValidObjectId) {
        return helpers.message({
          custom: "Invalid 'categoryId'. Must be a MongoDB ObjectId",
        });
      }
      return value;
    })
    .required(),
});

const deleteTransactionSchema = Joi.object({
  transactionId: Joi.string()
    .custom((value, helpers) => {
      const isValidObjectId = mongoose.Types.ObjectId.isValid(value);
      if (!isValidObjectId) {
        return helpers.message({
          custom: "Invalid 'transactionId'. Must be a MongoDB ObjectId",
        });
      }
      return value;
    })
    .required(),
});

const getParamsTransactionsSchema = Joi.object({
  date: Joi.string()
    .pattern(dateRegexp)
    .required()
    .error(errors => {
      errors.forEach(err => {
        console.log(err.code);
        switch (err.code) {
          case 'any.required':
            err.message = 'Value date should not be empty!';
            break;
          case 'string.pattern.base':
            err.message = `Value date should have be correct!`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
});

const getQueryTransactionsSchema = Joi.object({
  type: Joi.string().valid('expenses', 'income'),
  page: Joi.number().min(1).max(1000),
  limit: Joi.number().min(1).max(1000),
});

const getQueryReportSchema = Joi.object({
  year: Joi.number().min(1500).max(2500),
  month: Joi.number().min(1).max(12),
  limit: Joi.number().min(1).max(120),
});

const joiSchemas = {
  add: addTransactionSchema,
  delete: deleteTransactionSchema,
  getParam: getParamsTransactionsSchema,
  getQuery: getQueryTransactionsSchema,
  getReport: getQueryReportSchema,
};
const Transaction = model('transaction', transactionSchema);

module.exports = {
  Transaction,
  joiSchemas,
  ObjectId,
};
