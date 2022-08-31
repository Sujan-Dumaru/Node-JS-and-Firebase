const express = require('express');
const { signup, emailVerification, signin } = require('../Services/authservices');

const router = express.Router();

router.post('/signup', signup);
router.post('/emailverification', emailVerification);
router.post('/signin', signin);

module.exports = {
    routes: router
}