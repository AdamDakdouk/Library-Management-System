const { getAllIssuedBooks, issueBook, returnBook } = require("../services/issuedBook.services")

/**
 * Retrieves all issued books from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
const getAllIssuedBooksController = async (req, res) => {
    try {
        const issuedBooks = await getAllIssuedBooks();
        res.status(200).json(issuedBooks);
    } catch (error) {
        res.status(500).json(`Error getting all issued books: ${error}` );
    }
}

/**
 * Issues a specified book to a specified student.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
const issueBookController = async (req, res) => {
    try {
        const { student_id, book_id } = req.body;
        const response = await issueBook(student_id, book_id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(`Couldn\'t issue book: ${error}`);
    }
}

/**
 * Returns an issued book
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
const returnBookController = async (req, res) => {
    try {
        const { book_id } = req.body;
        const response = await returnBook(book_id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(`Couldn\'t return book: ${error}`);
    }
}

module.exports = {
    getAllIssuedBooksController,
    issueBookController,
    returnBookController,
}