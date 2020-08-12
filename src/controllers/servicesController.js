const express = require('express')
const authMiddleware = require('../middlewares/authValidate')

const router = express.Router()

router.use(authMiddleware)

router.get('/api/v1/services', (req, res) => {
    return res.json({message: 'Logged in user'})
})

module.exports = router
