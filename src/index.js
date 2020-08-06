const express =  require('express')
const auth = require('./controllers/authController')
const app = express()


app.use(express.json())
app.use(auth)


const port = process.env.PORT || 3333

app.listen(port, () => console.log('Server ON'))