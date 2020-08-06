const express = require('express')
const { Router } = require('express')
const authMiddleware = require('../middlewares/authValidate')

const router = express.Router()

router.use(authMiddleware)

router.get('/projects', (req, res) => {
    return res.json({message: 'Logged in user'})
})

module.exports = router
