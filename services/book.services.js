const Student = require("../models/Student");
const Book = require("../models/Book");
const moment = require("moment/moment");

/**
 * Retrieves all books from the database.
 *
 * @returns {Book[]}
 */
const getAllBooks = async () => {
    try {
        const books = await Book.findAll();
        if (!books) {
            return "There are no books found";
        }
        return books;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Retrieves a book from the database specified by his id
 * 
 * @param {integer} id - ID of the book 
 * @returns {Student} 
 */
const getBookById = async (id) => {
    try {
        const book = await Book.findByPk(id);
        if (!book) {
            return `Book with ID ${id} not found`;
        }
        return book;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Inserts a new book to the database
 * 
 * @param {string} title - Book title 
 * @param {string} author -  Author of the book 
 * @param {string} minAgeRequired - Minimum age required to be able to read book
 * @param {string} publication - book publication 
 * @returns {Student}
 */
const addBook = async (title, author, minAgeRequired, publication) => {
    try {
        const newBook = await Book.create({
            book_title: title,
            book_author: author,
            book_min_age_required: minAgeRequired,
            book_publication: moment(publication).format("YYYY-MM-DD"),
        });

        return newBook.toJSON();

    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Inserts a new book to the database
 * 
 * @param {integer} id - ID of the book
 * @param {string} title - Book title 
 * @param {string} author -  Author of the book 
 * @param {string} minAgeRequired - Minimum age required to be able to read book
 * @param {string} publication - book publication 
 * @returns {Student}
 */
const updateBook = async (id, title, author, minAgeRequired, publication) => {
    try {

        const updateBook = await Book.update({
            book_title: title,
            book_author: author,
            book_min_age_required: minAgeRequired,
            book_publication: publication.toLocaleDateString(),
        }, { where: { book_id: id } });

        const updatedBook = await Book.findOne({ where: { student_id: id } });
        return updatedBook;

    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Deletes a book specified by its id
 * 
 * @param {integer} id - ID of the book 
 * @returns {String} 
 */
const deleteBook = async (id) => {
    try {
        const book = await Book.findByPk(id);
        if (!book) {
            return "Book not found. Couldn't delete"
        }

        const deletedBook = await Book.destroy({
            where: {
                book_id: id,
            },
        });

        // If book was deleted successfully
        if (deletedBook > 0) {
            return `Book with ID ${id} deleted successfully:`;;
        } else {
            return "No book was deleted";
        }
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    addBook,
    updateBook,
    getAllBooks,
    getBookById,
    deleteBook,
}

