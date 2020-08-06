const express = require('express');
const { Router } = require('express');
const authMiddleware = require('../middlewares/authValidate')

const router = express.Router();

router.use(authMiddleware)

router.get('/user/login', (req, res) => {
    return res.json({message: 'logged in user'});
});

module.exports = router
