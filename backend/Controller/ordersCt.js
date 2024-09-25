/* eslint-disable camelcase */
const express = require('express');
const createOrderModel = require('../Model/ordersMd');
const createUserModel = require('../Model/regLoginMd');


exports.createOrder = async (req, res) => {
  const Order = createOrderModel(req.globalDB);
  const User = createUserModel(req.globalDB);

  const { userId, userName, contactNo, userAddress, amount, orderDate, deliveryDate, status, paymentType, items ,email} = req.body;

  try {
    let user = await User.findOne({email});
    const order = new Order({
      userId,
      userName,
      contactNo,
      userAddress,
      amount,
      orderDate,
      deliveryDate,
      status,
      paymentType,
      items,
    });
    await order.save();
    user.order.push(String(order._id));
    await user.save();
    // console.log(order._id);
    res.status(201).json({ success: 'Order created successfully', order });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create order. Please check the data.' });
  }
};

exports.getOrder = async (req, res) => {
  const Order = createOrderModel(req.globalDB);
  const { _id } = req.params;

  try {
    if (!_id) {
      return res.status(400).json({ error: 'Please send a valid order ID' });
    }

    const order = await Order.findById(_id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json({ order });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};

exports.getAllOrder = async (req, res) => {
  const Order = createOrderModel(req.globalDB);

  try {
    const orders = await Order.find({});
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};

// Update method
exports.updateOrder = async (req, res) => {
  const Order = createOrderModel(req.globalDB);
  const { _id, userId, userName, contactNo, userAddress, amount, orderDate, deliveryDate, status, paymentType, items } = req.body;

  try {
    const order = await Order.findById(_id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update fields if provided
    if (userId) order.userId = userId;
    if (userName) order.userName = userName;
    if (contactNo) order.contactNo = contactNo;
    if (userAddress) order.userAddress = userAddress;
    if (amount) order.amount = amount;
    if (orderDate) order.orderDate = orderDate;
    if (deliveryDate) order.deliveryDate = deliveryDate;
    if (status) order.status = status;
    if (paymentType) order.paymentType = paymentType;
    if (items) order.items = items;

    await order.save();
    res.json({ success: 'Order information updated successfully', order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order information', message: error.message });
  }
};

// Delete method
exports.deleteOrder = async (req, res) => {
  const Order = createOrderModel(req.globalDB);
  const { _id } = req.body;

  try {
    const order = await Order.findByIdAndDelete(_id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ success: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order', message: error.message });
  }
};

exports.getOrdersByIds = async (req, res) => {
  const Order = createOrderModel(req.globalDB);
  const { ids } = req.body; // Expecting an array of IDs

  try {
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'Please provide a valid array of order IDs' });
    }

    const orders = await Order.find({ _id: { $in: ids } });
    
    if (orders.length === 0) {
      return res.status(404).json({ error: 'No orders found for the provided IDs' });
    }

    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};
