const mongoose = require('mongoose');
const Joi = require('joi');

const { Schema, model } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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
    default: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true },
);

const addCategorySchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  type: Joi.string().min(2).max(50).valid('expenses', 'income').required(),
});

const deleteAndUpdateCategorySchema = Joi.object({
  categoryId: Joi.string()
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

const updateDefaultSchema = Joi.object({ default: Joi.boolean().required() });

const joiSchemas = {
  add: addCategorySchema,
  deleteAndUpdate: deleteAndUpdateCategorySchema,
  update: updateDefaultSchema,
};
const Category = model('category', categorySchema);

module.exports = {
  Category,
  joiSchemas,
};
