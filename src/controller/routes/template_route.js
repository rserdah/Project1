const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => res.send(`<template router>`));

//Don't use braces for routers' exports in this case (because we want this to be the only thing it exports and it is simpler when using require if there are no braces here)
module.exports = router;