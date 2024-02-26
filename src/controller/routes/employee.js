const express = require('express');
const path = require('path');
const auth = require('../middleware/auth');

const router = express.Router();

// /employee

router.post('/register', auth.register);

router.post('/login', auth.authLogin);

//Don't use braces for routers' exports in this case (because we want this to be the only thing it exports and it is simpler when using require if there are no braces here)
module.exports = router;