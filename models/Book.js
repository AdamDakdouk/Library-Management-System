const { DataTypes } = require('sequelize');
const sequelize = require("../database/config");
const Student = require("./Student");

/**
 * Sequelize model for representing books.
 *
 * @class
 */
const Book = sequelize.define("Book", {

    // Primary key for the book.
    book_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    // Foreign key referencing the student who owns the book.
    student_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Student',
            key: 'student_id',
        }
    },

    // Title of the book.
    book_title: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    // Author of the book.
    book_author: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    // Minimum age required to read the book.
    book_min_age_required: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    // Publication date of the book.
    book_publication: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    // Availability status of the book (default: true).
    book_availability: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    tableName: "books",
    timestamps: true,
});

module.exports = Book;