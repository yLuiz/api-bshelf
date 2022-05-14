require('dotenv').config()

const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

app.use(
  express.urlencoded(
    {
      extended: true
    }
  )
)

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.status(200).json({message: "API BShelf"})
})

const bookRoutes = require('./routes/book.routes')

app.use('/book', bookRoutes)

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@bshelfcluster.aigsv.mongodb.net/bancobshelf?retryWrites=true&w=majority`)
.then(() => {
  console.log("Conectado ao MondoDB!")
  app.listen(5000)
})
.catch(err => console.log(err))