const express =  require('express')
const auth = require('./controllers/authController')
const project = require('./controllers/projectController')

const app = express()


app.use(express.json())
app.use(auth)
app.use(project)


const port = process.env.PORT || 3333

app.listen(port, () => console.log('Server ON'))