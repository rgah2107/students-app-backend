const express = require('express')
const cors = require('cors');
const app = express()
app.use(cors());
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const port = process.env.PORT || 5000
const uri = process.env.USERS_URI

mongoose.connect(uri)
const connection = mongoose.connection
connection.once('error', (err) => {
  console.log(err)
})

connection.once('open', () => {
  console.log('MongoDB database connection established successfully')
})

app.use(express.json())

app.use('/students', require('./routes/students'))

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
