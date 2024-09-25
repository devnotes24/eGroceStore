const express = require('express');

const router = express.Router();
const productsCt = require('../Controller/productsCt');

router.post('/createProd', productsCt.createProd);
router.get('/getProd', productsCt.getProd);
router.get('/getAllProd', productsCt.getAllProd);

router.put('/updateProd', productsCt.updateProd);
router.delete('/deleteProd', productsCt.deleteProd);


module.exports = router;
