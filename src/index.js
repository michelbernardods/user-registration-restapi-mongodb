const express =  require('express')
const auth = require('./controllers/authController')
const services = require('./controllers/servicesController')

const app = express()


app.use(express.json())
app.use(auth)
app.use(services)


const port = process.env.PORT || 3333

app.listen(port, () => console.log('Server ON'))