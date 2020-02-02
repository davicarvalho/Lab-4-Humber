const express = require('express')
const User = require('./models/user')
const userRouter = require('./routers/user')
const mongoose = require('./db/mongoose')

const app = express()
const port = 3000

app.use(express.json())
app.use(userRouter)


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))