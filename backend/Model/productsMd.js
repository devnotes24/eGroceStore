const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



const productsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  unit: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  category: {
    type: String
  },
  imageUrl:{
    type: String,
  }
});

// Pre-save hook to hash password before saving
productsSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const createProductModel = (connection) => {
  return connection.model('Product', productsSchema);
};
module.exports = createProductModel;
