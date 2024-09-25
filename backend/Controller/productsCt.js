/* eslint-disable camelcase */
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const createProductModel = require('../Model/productsMd');

exports.createProd = async (req, res) => {
  const Product = createProductModel(req.globalDB);
  const { name, price , unit , quantity ,category,imageUrl} = req.body;
  console.log(name);
  try {
    const product = new Product({name, price , unit , quantity ,category,imageUrl});
    await product.save();

    res.status(201).json({ success: 'Product created successfully' });
  } catch (error) {
    res.json({ error: 'Product already registered/Try different Product' });
  }
};

exports.getProd = async (req, res) => {
  const Prod = createProductModel(req.globalDB);
  const { _id } = req.params;
  try {
    if(_id){
    const product = await Prod.findOne({_id});
    if (!product) {
      return res.json({ error: 'Product not registered yet' });
    }
    res.json({
      product
    });
  }
    else{
      return res.json({error:"Please send valid product id"});
    }

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllProd = async (req, res) => {
  const Prod = createProductModel(req.globalDB);
  try {
    const product = await Prod.find({});
    if (!product) {
      return res.json({ error: 'Product not registered yet' });
    }
    res.json({
      product
    });

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update method
exports.updateProd = async (req, res) => {
  const Product = createProductModel(req.globalDB);
  const {_id, name, price , unit , quantity ,category,imageUrl}  = req.body;

  try {
    // Find the user by ID
    let product = await Product.findOne({_id});
    if (!product) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update fields if provided (avoid overwriting if not provided)
    if (name) product.name = name;
    if (price) product.price = price;

    // Hash new password if provided
    if (unit) product.unit = unit;
    if (quantity) product.quantity = quantity;
    if(category) product.category=category;
    if(imageUrl) product.imageUrl=imageUrl;
    // Save the updated user
    await product.save();

    res.json({ success: 'product information updated successfully', product });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product information', message: error.message });
  }
};

// Delete method
exports.deleteProd = async (req, res) => {
  const Product = createProductModel(req.globalDB);
  const { _id } = req.body; // Email provided in the request body for deleting the user

  try {
    // Find user by email and delete
    const product = await Product.findOneAndDelete({ _id });

    // If no user found with the email
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // If user deleted successfully
    res.json({ success: 'Product deleted successfully' });
  } catch (error) {
    // Handle any server or database errors
    res.status(500).json({ error: 'Failed to delete product', message: error.message });
  }
};
