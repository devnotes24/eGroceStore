const express = require('express');

const router = express.Router();
const regLoginCt = require('../Controller/regLoginCt');

router.post('/register', regLoginCt.register);
router.post('/login', regLoginCt.login);
router.post('/getUser', regLoginCt.getUser);

router.put('/updateUser', regLoginCt.updateUser);
router.delete('/deleteUser', regLoginCt.deleteUser);


module.exports = router;
