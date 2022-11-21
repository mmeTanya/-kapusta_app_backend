const { model, Schema } = require('mongoose');

const roleSchema = Schema(
  {
    name: {
      type: String,
      default: 'USER',
      unique: true,
    },
  },
  { timestamps: true, versionKey: false },
);
const Role = model('Role', roleSchema);
module.exports = {
  Role,
};
