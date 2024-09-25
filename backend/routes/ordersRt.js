const express = require('express');

const router = express.Router();
const ordersCt = require('../Controller/ordersCt');


router.post('/createOrder', ordersCt.createOrder);
router.get('/getOrder/:_id', ordersCt.getOrder);
router.get('/getAllOrder', ordersCt.getAllOrder);
router.post('/getOrdersByIds', ordersCt.getOrdersByIds);
router.put('/updateOrder', ordersCt.updateOrder);
router.delete('/deleteOrder', ordersCt.deleteOrder);

module.exports = router;
