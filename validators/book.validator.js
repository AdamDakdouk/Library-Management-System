const { check } = require("express-validator");

/**
 * Validation middleware for adding a book.
 */
const addBookValidation = [
    // Check if the book title is not empty.
    check("book.book_title").notEmpty().withMessage("Book title is required"),

    // Check if the book author is not empty.
    check("book.book_author").notEmpty().withMessage("Book author is required"),

    // Check if the minimum required age is not empty.
    check("book.book_min_age_required").notEmpty().withMessage("Minimum required age is required"),

    // Check if the book publication date is not empty.
    check("book.book_publication").notEmpty().withMessage("Book publication is required"),
];

/**
 * Validation middleware for updating a book.
 */
const updateBookValidation = [
    // Check if the book id is not empty.
    check("book.book_id").notEmpty().withMessage("user ID is required"),

    // Check if the book title is not empty.
    check("book.book_title").notEmpty().withMessage("Book title is required"),

    // Check if the book author is not empty.
    check("book.book_author").notEmpty().withMessage("Book author is required"),

    // Check if the minimum required age is not empty.
    check("book.book_min_age_required").notEmpty().withMessage("Minimum required age is required"),

    // Check if the book publication date is not empty.
    check("book.book_publication").notEmpty().withMessage("Book publication is required"),
];

module.exports = {
    addBookValidation,
    updateBookValidation,
}