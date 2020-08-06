const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

const router = express.Router()

router.post('/user/register', async (req, res) => {
    const { email } = req.body
    try {

        if(await User.findOne({ email })) 
            return res.status(400).send({error: 'User exist'})

        const user = await User.create(req.body)

        user.password = undefined

        return res.status(201).send({ message: 'User create' })

     } catch (error) {
        return res.status(400).send({error: 'Registration failed'})
    }
})


router.post('/user/authenticate/login', async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')

    if(!user) 
        return res.status(400).json({error: 'E-mail not foud'})

    if(!await bcrypt.compare(password, user.password))
        return res.status(400).json({error: 'Invalid password'})

        
})


router.get('/user', async (req, res) => {

    const users = await User.find()

    res.status(200).json(users)

    try {
        const users = await User.find()

        res.status(200).json(users)
    }
    catch (error) {
        throw new Error
    }
})

module.exports = router