const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Schema, model } = require('mongoose');
const Joi = require('joi');

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    token: {
      type: String,
      default: null,
    },
    balance: {
      type: Number,
      default: 0,
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    roles: [
      {
        type: String,
        ref: 'Role',
      },
    ],
  },
  { versionKey: false, timestamps: true },
);

userSchema.methods.setPassword = async function (password) {
  this.password = await bcrypt.hash(password, Number(process.env.HASH_POWER));
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.createToken = function () {
  const payload = {
    id: this._id,
    roles: this.roles,
  };

  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRE_TIME,
  });
};

const registerAndLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const updateBalanceSchema = Joi.object({
  balance: Joi.number().required(),
});

const joiSchemas = {
  registerAndLogin: registerAndLoginSchema,
  balance: updateBalanceSchema,
};

const User = model('user', userSchema);

module.exports = {
  User,
  joiSchemas,
};
