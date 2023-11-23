const { validationResult } = require("express-validator");
const { getAllBooks, addBook, updateBook } = require("../services/book.services");

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
    } catch (err) {
        res.status(500).json(err)
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
        const book = await getStudentById(book_id);
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json(err)
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

        const { book_title, book_author, book_min_age_required, book_publication } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const response = await addBook(book_title, book_author, book_min_age_required, book_publication);
        res.status(201).json({ response });
    } catch (err) {
        res.status(500).json(err)
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
    } catch (err) {
        res.status(500).json(err)
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
        const response = await deleteStudent(book_id);
        res.status(201).json({ response });
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    getAllBooksController,
    getBookByIdController,
    addBookController,
    updateBookController,
    deletedBookController,
}