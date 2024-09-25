/* eslint-disable camelcase */
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const createUserModel = require('../Model/regLoginMd');

exports.register = async (req, res) => {
  const User = createUserModel(req.globalDB);
  const { name, lastName , email , password ,isAdmin} = req.body;
  console.log(name);
  try {
    const user = new User({ name, lastName , email ,password ,isAdmin});
    await user.save();

    res.status(201).json({ success: 'User registered successfully' });
  } catch (error) {
    res.json({ error: 'User already registered/Try different email' });
  }
};

exports.login = async (req, res) => {
  const User = createUserModel(req.globalDB);
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: 'User not registered yet' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ error: 'Email or password is wrong' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'Shiva@45', {
      expiresIn: '1h',
    });

    // Return token in response body instead of setting a cookie
    res.json({
      success: 'Successfully logged in',
      token, // Send the token in the response
      user
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUser = async (req, res) => {
  const User = createUserModel(req.globalDB);
  const { email } = req.body;
  try {
    if(email){
    const user = await User.findOne({email});
    if (!user) {
      return res.json({ error: 'User not registered yet' });
    }
    res.json({
      user
    });
  }

    else{
      return res.json({error:"Please send valid email"});
    }

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


// Update method
exports.updateUser = async (req, res) => {
  const User = createUserModel(req.globalDB);
  const { name, lastName, password ,email ,cart ,orderId} = req.body;

  try {
    // Find the user by ID
    let user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update fields if provided (avoid overwriting if not provided)
    if (name) user.name = name;
    if (lastName) user.lastName = lastName;

    // Hash new password if provided
    if (password) user.password = password;
    if (cart) user.cart = cart;
    if(orderId) user.order.push(orderId);
    // Save the updated user
    await user.save();

    res.json({ success: 'User information updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user information', message: error.message });
  }
};

// Delete method
exports.deleteUser = async (req, res) => {
  const User = createUserModel(req.globalDB);
  const { email } = req.body; // Email provided in the request body for deleting the user

  try {
    // Find user by email and delete
    const user = await User.findOneAndDelete({ email });

    // If no user found with the email
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // If user deleted successfully
    res.json({ success: 'User deleted successfully' });
  } catch (error) {
    // Handle any server or database errors
    res.status(500).json({ error: 'Failed to delete user', message: error.message });
  }
};
