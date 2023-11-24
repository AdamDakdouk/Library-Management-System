const Student = require("../models/Student");
const Book = require("../models/Book");
const moment = require("moment/moment");

const getAllBooks = async () => {
    try {
        const books = await Book.findAll();
        if (!books) {
            return "There are no books found";
        }
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
        const newBook = await Book.create({
            book_title: title,
            book_author: author,
            book_min_age_required: minAgeRequired,
            book_publication: moment(publication).format("YYYY-MM-DD"),
        });

        return newBook.toJSON();

    } catch (err) {
        console.error("Error creating book ", err)
    }
}

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

    } catch (err) {
        console.error("Error updating book ", err)
    }
}

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
    } catch (err) {
        console.error("Error deleting book ", err);
    }
}

module.exports = {
    addBook,
    updateBook,
    getAllBooks,
    getBookById,
    deleteBook,
}

