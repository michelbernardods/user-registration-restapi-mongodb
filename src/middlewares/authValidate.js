const jwt = require('jsonwebtoken')
const authconfig = require('../config/auth.json')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader)
        return res.status(401).json({error: 'No token provided'})
    
    const splitInTwoParts = authHeader.split(' ')
    
    if (!splitInTwoParts.lenght === 2)
        return res.status(401).json({error: 'Token error'}) 

    const [ bearer, token ] = splitInTwoParts

    if (!/^Bearer$/i.test(bearer))
        return res.status(401).json({error: 'Token malformatted'}) 
    
    jwt.verify(token, authconfig.secret, (err, decoded) => {
        if (err) return res.status(401).json({error: 'Token invalid'}) 
        
        req.userId = decoded.userId

        next()
    })
 
}
