const router = require("express").Router()
const Book = require("../model/Book.model")

/* ---------- ROTA DE CRIAÇÃO ---------- */

router.post('/', async(req, res) => {
  const { title, author, url_img, description, pages } = req.body

  const book = {
    title,
    author,
    url_img,
    description,
    pages
  }

  try {
    await Book.create(book)
    res.status(201).json({message: "Livro inserido com sucesso!"})
  }
  catch(err){
    res.status(500).json({ERROR: err})
  }
})

/* ---------- ROTA DE CONSULTA ---------- */

router.get('/', async(req, res) => {
  try {
    const book = await Book.find()

    if(book.length === 0) {
      return res.status(404).json({message: "Não há livros cadastrados!"})
    }

    res.status(200).json(book) 
  }
  catch(err) {
    res.status(500).json({ERROR: err})
  }
})

/* ---------- ROTA DE CONSULTA ÚNICA VIA ID ---------- */

router.get('/:id', async(req, res) => {
  const { id } = req.params
  try {
    const book = await Book.findOne({_id: id})

    if(!book) {
      return res.status(404).json({message: "Livro não encontrado!"})
    }

    res.status(200).json(book)
  }
  catch(err) {
    res.status(500).json({ERROR: err})
  }
})

/* ---------- ROTA DE UPDATE ---------- */

router.patch('/:id', async(req, res) => {
  const { id } = req.params

  const { title, author, url_img, description, pages } = req.body

  const book = {
    title,
    author,
    url_img,
    description,
    pages
  }

  try {
    const updatedBook = await Book.updateOne({_id: id}, book)

    if(!updatedBook) {
      return res.status(404).json({message: "Livro não encontrado!"})
    }

    res.status(200).json(updatedBook)
  }
  catch(err) {
    res.status(500).json({ERROR: err})
  }
})

/* ---------- ROTA DE REMOÇÃO ---------- */

router.delete('/:id', async(req, res) => {
  const { id } = req.params

  const book = await Book.findOne({_id: id})

  if(!book) {
    return res.status(404).json({message: "Livro não encontrado!"})
  }

  try {
    await Book.deleteOne({_id: id})
    res.status(200).json({message: "Livro removido com sucesso!"})
  } 
  catch(err) {
    res.status(500).json({ERROR: err})
  }
})

module.exports = router