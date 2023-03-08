const express = require('express')
const cors = require('cors')
require('dotenv').config()


// Connect MongoDB
require('./db')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/api/todos', require('./routes/todos'))


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server has been running on port ${PORT}`)
})