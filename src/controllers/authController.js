const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth.json')
const User = require('../models/user')

const router = express.Router()


function generateToken( userId ) {
    return jwt.sign({ userId }, authConfig.secret, {
        expiresIn: 86400
    })
}


router.post('/api/v1/user/register', async (req, res) => {
    const { email } = req.body
    
   try {

     if(await User.findOne({ email })) 
        return res.status(400).json({error: 'User exist'})

     const user = await User.create(req.body)

     user.password = undefined

     return res.status(201).json({ message: 'User create', token: generateToken({ id: user.id})})

     } catch (error) {
        throw new Error({error: 'Registration failed'})
    }
})


router.post('/api/v1/user/authenticate/login',  async (req, res) => {
   try {
     const { email, password } = req.body
        
     const user = await User.findOne({ email }).select('+password')
    
     if(!user) 
        return res.status(400).json({error: 'E-mail not foud'})
    
     if(!await bcrypt.compare(password, user.password))
        return res.status(400).json({error: 'Invalid password'})
    
     user.password = undefined
    
     return res.status(200).json({user, token: generateToken({ id: user.id})})

    } catch (error) { throw new Error({error: 'Failed in Login'})}
})


router.get('/api/v1/users', async (req, res) => {

     try {
        const users = await User.find()

        res.status(200).json({users})
    }
    catch (error) { throw new Error({error: 'Error to users list'}) }
})

module.exports = router