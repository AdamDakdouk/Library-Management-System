const Student = require("../models/Student");
const Book = require("../models/Book");
const moment = require("moment/moment");
const { Op } = require("sequelize");

/**
 * Retrieves all books from the database.
 *
 * @returns {Book[]}
 */
const getAllBooks = async () => {
    try {
        const books = await Book.findAll();
        if (!books || books.length === 0) {
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
 * Searches for books with similar title to the specified one
 * 
 * @param {Object} title 
 * @returns {Book[]} 
 */
const getBooksByTitle = async (title) => {
    try {
        const books = await Book.findAll({
            where: {
                book_title: {
                    [Op.like]: `%${title}%`
                }
            }
        });

        if (!books || books.length === 0) {
            return `There are no books of title: ${title}`;
        }

        return books;
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
const addBook = async (book) => {
    try {
        const newBook = await Book.create({
            book_title: book?.book_title,
            book_author: book?.book_author,
            book_min_age_required: book?.book_min_age_required,
            book_publication: moment(book?.book_publication).format("YYYY-MM-DD"),
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
const updateBook = async (book) => {
    try {

        const updateBook = await Book.update({
            book_title: book?.book_title,
            book_author: book?.book_author,
            book_min_age_required: book?.book_min_age_required,
            book_publication: moment(book?.book_publication).format("YYYY-MM-DD"),
        }, { where: { book_id: book?.book_id } });

        const fetchUpdatedBook = await Book.findOne({ where: { book_id: book?.book_id } });
        return fetchUpdatedBook;

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
    getBooksByTitle,
    deleteBook,
}

