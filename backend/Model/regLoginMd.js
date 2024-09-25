const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



const regLoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: String,
    default: 'false',
  },
  cart:{
    type: Array,
  },
  order:{
    type: Array,
  }
});

// Pre-save hook to hash password before saving
regLoginSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const createUserModel = (connection) => {
  return connection.model('User', regLoginSchema);
};
module.exports = createUserModel;
