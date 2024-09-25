const express = require('express');

const router = express.Router();

router.use('/regLoginRt', require('./regLoginRt'));
router.use('/productsRt', require('./productsRt'));
router.use('/ordersRt', require('./ordersRt'));

module.exports = router;
