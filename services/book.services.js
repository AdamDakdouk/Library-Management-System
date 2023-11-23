const Student = require("../models/Student");
const Book = require("../models/Book");

const getAllBooks = async () => {
    try {
        const books = await Book.findAll({ include: [{ model: Student }] });
        return books;
    } catch (err) {
        console.error('Error getting all books ', err);
    }
}

const getBookById = async (id) => {
    try {
        const book = await Book.findByPk(id);
        if (!book) {
            return `Book with ID ${id} not found`;
        }
        return book;
    } catch (err) {
        console.error("Error getting the book ", err);
    }
}

const addBook = async (title, author, minAgeRequired, publication) => {
    try {
        const newBook = await Student.create({
            book_title: title,
            book_author: author,
            book_min_age_required: minAgeRequired,
            book_publication: publication,
        });

        return newBook.toJSON();

    } catch (err) {
        console.error("Error creating book ", err)
    }
}

const updateBook = async (id, title, author, minAgeRequired, publication) => {
    try {

        const updateBook = new Book.update({
            book_title: title,
            book_author: author,
            book_min_age_required: minAgeRequired,
            book_publication: publication,
        }, { where: { book_id: id } });

        return updateBook;

    } catch (err) {
        console.error("Error updating book ", err)
    }
}

const removeBook = async (id) => {
    try {
        const book = await Book.findByPk(id);
        if (!book) {
            return "Book not found. Couldn't delete"
        }

        const deletedBook = await Book.destroy();
        return deletedBook.toJSON();
    } catch (err) {
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

