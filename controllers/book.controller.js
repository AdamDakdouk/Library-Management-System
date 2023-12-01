const { validationResult } = require("express-validator");
const { getAllBooks, addBook, updateBook, getBookById, deleteBook } = require("../services/book.services");

/**
 * Retrieves all books from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
const getAllBooksController = async (req, res) => {
    try {
        const books = await getAllBooks();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json(`Error getting all books: ${error}`);
    }
}

/**
 * Retrieves a book by ID from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
const getBookByIdController = async (req, res) => {
    const { book_id } = req.body;

    if (!book_id) {
        return res.status(400).json({ message: "missing student id" });
    }

    try {
        const book = await getBookById(book_id);
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json(`Error getting book: ${error}`);
    }
}

/**
 * Inserts a new book into the database after checking the validity of each attribute.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
const addBookController = async (req, res) => {

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { book_title, book_author, book_min_age_required, book_publication } = req.body;

        const response = await addBook(book_title, book_author, book_min_age_required, book_publication);
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json(`Error creating book: ${error}`);
    }
}

/**
 * updates the specified book after checking the validity of each attribute.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
const updateBookController = async (req, res) => {

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extracting data from the request body
        const { book_id, book_title, book_author, book_min_age_required, book_publication } = req.body;

        const response = await updateBook(book_id, book_title, book_author, book_min_age_required,
            book_publication);
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json(`Error updating book: ${error}`);
    }
}

/**
 * Deletes a specified book from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
const deletedBookController = async (req, res) => {
    const { book_id } = req.body;
    if (!book_id) {
        return res.status(400).json({ message: "missing student id" });
    }

    try {
        const response = await deleteBook(book_id);
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json(`Error deleting book: ${error}`);
    }
}

module.exports = {
    getAllBooksController,
    getBookByIdController,
    addBookController,
    updateBookController,
    deletedBookController,
}