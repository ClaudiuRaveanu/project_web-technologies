const express = require('express')
const router = express.Router()
const Books = require('../models/Book')

router.get("/", async (req, res) => {
    const books = await Books.find()
    res.json(books)
})

router.post("/new-book", async (req, res) => {
    const newBook = new Books(req.body)
    const savedBook = await newBook.save()
    res.json(savedBook)
})

router.get("/get/:id", async (req, res) => {
    const book = await Books.findById({ _id: req.params.id })
    res.json(book)
})

router.delete("/delete/:id", async (req, res) => {
    const result = await Books.findByIdAndDelete({ _id: req.params.id })
    res.json(result)
})

router.patch("/update/:id", async (req, res) => {
    const book = Books.updateOne({ _id: req.params.id }, { $set: res.body })
    res.json(book)
})

router.patch("/remove-review/:id", async (req, res) => {
    const result = Books.findOneAndUpdate({ _id: req.params.id }, { $pull: { reviews: { _id: req.body.review_id }}})
    res.json(result)
})

router.get("/random", async (req, res) => {
    const count = Books.estimatedDocumentCount()
    const random = Math.floor(Math.random() * count)
    var book = await Books.findOne({ stock: { $gt: 0 }}, {}).skip(random)
    while (book === NULL)
        book = await Books.findOne({ stock: { $gt: 0 }}, {}).skip(Math.floor(Math.random() * count))
    Books.find().limit(10)
    res.json(book)
})

router.get("/total", async (req, res) => {
    const total = await Books.estimatedDocumentCount()
    res.json(total)
})

module.exports = router