const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const itemSchema = new mongoose.Schema({
  item: { type: String},
  quantity: { type: String },
  price: { type: Number }
});

const orderSchema = new mongoose.Schema({
  userId: { type: String},
  userName: { type: String},
  contactNo: { type: String },
  userAddress: { type: String},
  amount: { type: Number },
  orderDate: { type: Date},
  deliveryDate: { type: Date },
  status: { type: String },
  paymentType: { type: String },
  items: [itemSchema]
});

// Pre-save hook to hash password before saving
orderSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const createOrderModel = (connection) => {
  return connection.model('Order', orderSchema);
};
module.exports = createOrderModel;
