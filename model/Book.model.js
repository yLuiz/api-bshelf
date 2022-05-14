const mongoose = require('mongoose')

const Book = mongoose.model('Book',{
  title: String,
  author: String,
  url_img: String,
  description: String,
  pages: Number
})

module.exports = Book