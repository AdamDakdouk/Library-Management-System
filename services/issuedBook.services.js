const Student = require("../models/Student");
const Book = require("../models/Book");
const IssuedBook = require("../models/IssuedBook")

/**
 * Retrieves all issued books from the database
 * @returns {IssuedBook}
 */
const getAllIssuedBooks = async () => {
    try {
        const issuedBooks = await IssuedBook.findAll();
        if (!issuedBooks) {
            return "There are no books issued";
        }
        return issuedBooks;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Issues a book to student
 * @param {int} studentID - Student id
 * @param {int} bookID - Book id
 * @returns {IssuedBook}
 */
const issueBook = async (studentID, bookID) => {
    try {
        const student = await Student.findByPk(studentID);
        if (!student) {
            return "Invalid student ID"
        }

        const book = await Book.findByPk(bookID);
        if (!book) {
            return "Invalid book ID"
        }

        if (!book.book_availability) {
            return "book is not available right now";
        }

        if (student.student_age < book.book_min_age_required) {
            return "Student doesn't meet the required age. Cannot issue book."
        }

        const newIssue = await IssuedBook.create({
            student_id: studentID,
            student_first_name: student.student_first_name,
            book_id: bookID,
            book_title: book.book_title,
        });

        const updateBook = await Book.update({
            student_id: studentID,
            book_availability: false,
        }, { where: { book_id: bookID } });

        return newIssue.toJSON();
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Returns an issued book
 * @param {int} bookID - Book id
 * @returns 
 */
const returnBook = async (bookID) => {
    try {
        const book = await Book.findByPk(bookID);
        if (!book) {
            return "Invalid book ID"
        }

        if (book.book_availability) {
            return "book is already available/returned"
        }

        const student = await Student.findByPk(book.student_id);

        const issue = await IssuedBook.findOne({ where: { book_id: bookID } })
        const deleteIssue = IssuedBook.destroy({
            where: {
                issue_id: issue.issue_id,
            }
        });

        const updateBook = await Book.update({
            student_id: null,
            book_availability: true,
        }, { where: { book_id: bookID } });

        return `Book with ID ${bookID} was successfully returned from student with ID ${student.student_id}`;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getAllIssuedBooks,
    issueBook,
    returnBook,
}