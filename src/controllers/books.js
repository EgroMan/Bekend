const Book = require('../models/books')

// Получим всех книг из БД
const getBooks =  (request, response) => {
    //get all books
    Book.find({})
        .then(book => {
            response.status(200).send(book);
        })
        .catch(e => {
            response.status(500).send(e.message);
        });
}

// books id 
const getBook = (request, response) => {
       const {book_id} = request.params;
       return Book.findById(book_id).then(
        (book) => {
        if (!book) response.status(404).send("book not found")
        else response.status(200).send(book)
       }

    ).catch(e =>  response.status(500).send(e.message))
}

//create boos
const createBook = (request, response) => {
    return Book.create({...request.body}).then(
        (book) => {response.status(201).send(book)}
        
    ).catch(e =>  response.status(500).send(e.message))
}

//update books
const updateBook = (request, response) => {
    const {book_id} = request.params;
    return Book.findByIdAndUpdate(book_id, {...request.body}).then(
     (book) => {
        if (!book) response.status(404).send("cannot update")
        else response.status(200).send(book)
       }
 ).catch(e =>  response.status(500).send(e.message))
}

//delete book
const deleteBook = (request, response) => {
    const {book_id} = request.params;
    return Book.findByIdAndDelete(book_id).then(
     (book) => {
        if (!book) response.status(404).send("cannot delete")
        else response.status(200).send("sucess")
       }
 ).catch(e =>  response.status(500).send(e.message))
}

module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
}