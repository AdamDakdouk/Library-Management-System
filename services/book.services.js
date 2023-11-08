const Student = require("../model/Student");
const Book = require("../model/Book");

const addBook = async (book) => {
    try {
        const newBook = new Student.create({
            book_title: book.book_title,
            book_author: book.book_author,
            publication: book.publication,
        });

        return newBook.toJSON();

    }catch(err){
        console.error("Error creating book ", err)
    }
}

const getAllBooks = async () => {
    try{
        const books = await Book.findAll({ include: [{ model: Student }] });
        return books;
    }catch(err){
        console.error('Error getting all books ', err);
    }
}

const getBookById = async (id) => {
    try{
        const book = await Book.findByPk(id);
        if(!book){
            return "Book not found";
        }
        return book;
    }catch(err){
        console.error("Error getting the book ", err);
    }
}

const updateBook = async (book) => {
    try {

        const updateBook = new Book.update({
            book_title: book.book_title,
            book_author: book.book_author,
            publication: book.publication,
        }, { where: {book_id: book.book_id } });

        return updateBook;

    }catch(err){
        console.error("Error updating book ", err)
    }
}

const removeBook = async (id) => {
    try {
        const book = await Book.findByPk(id);
        if(!book){
            return "Book not found. Couldn't delete"
        }

        const deletedBook = await Book.destroy();
        return deletedBook.toJSON();
    }catch(err){
        console.error("Error deleting book ", err);
    }
}

module.exports = {
    addBook,
    updateBook,
    getAllBooks,
    getBookById,
    removeBook,
}

