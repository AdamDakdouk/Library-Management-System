const { check } = require("express-validator");

const addBookValidation = [
    check("book_title").notEmpty().withMessage("Book title is required"),
    check("book_author").notEmpty().withMessage("Book author is required"),
    check("book_min_age_required").notEmpty().withMessage("Minimum required age is required"),
    check("book_publication").notEmpty().withMessage("Book publication is required"),
];

const updateBookValidation = [
    check("book_id").notEmpty().withMessage("user ID is required"),
    check("book_title").notEmpty().withMessage("Book title is required"),
    check("book_author").notEmpty().withMessage("Book author is required"),
    check("book_min_age_required").notEmpty().withMessage("Minimum required age is required"),
    check("book_publication").notEmpty().withMessage("Book publication is required"),
];

module.exports = {
    addBookValidation,
    updateBookValidation,
}