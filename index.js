const express = require('express')
const app = express()
let books = require('./db/books.json')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/books', (req, res) => {
    res.status(200).json(books)
})

app.get('/books/:id', (req, res) => {
    const book = books.find(i => i.id === +req.params.id)
    res.status(200).json(book)
})

app.post('/books', (req, res) => {
    const { isbn, judul, sinopsis,penulis,genre } = req.body
    const id = books[books.length - 1].id + 1
    const book = {
        id, isbn, judul, sinopsis,penulis,genre
    }
    books.push(book)
    res.status(201).json(books)
}) 

app.put('/books/:id', (req, res)=>{
    const id = req.params.id
    books.filter(book => {
        if (books.id == id){
            books.isbn = req.body.isbn
            books.judul = req.body.judul
            books.sinopsis = req.body.sinopsis
            books.penulis = req.body.penulis
            books.genre = req.body.genre
            return book
        }
    })
    res.json(books)
})

app.delete('/books/:id', (req, res) => {
    books = books.filter(i => i.id != +req.params.id)
    res.status(200).json({
        message: `Buku dengan id ${req.params.id} sudah berhasil dihapus!`
    })
})

app.listen(3000, ()=>{
    console.log('Server nyala di port 3000!')
})