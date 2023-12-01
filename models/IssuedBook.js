const { DataTypes } = require('sequelize');
const sequelize = require("../database/config");
const Book = require("./Book");
const Student = require("./Student");

/**
 * Sequelize model for representing issued books.
 *
 * @class
 */
const IssuedBook = sequelize.define('IssuedBook', {

    // Primary key for the issued book.
    issue_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    // Foreign key referencing the student who issued the book
    student_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Student',
            key: 'student_id',
        }
    },

    // Name of the student, included here for quick reference.
    student_first_name: {
        type: DataTypes.STRING,
        references: {
            model: 'Student',
            key: 'student_first_name'
        },
    },

    // Foreign key referencing the book that is issued.
    book_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Book',
            key: 'book_id',
        }
    },

    // Title of the issued book, included here for quick reference.
    book_title: {
        type: DataTypes.STRING,
        references: {
            model: 'Book',
            key: 'book_title'
        }
    },

}, {
    tableName: 'IssuedBook',
    timestamps: false,
});

/**
 * Define associations with other models.
 */
IssuedBook.associate = () => {
    // Establish a one-to-many relationship with the Student model.
    IssuedBook.hasMany(Student, { foreignKey: "student_id" })

    // Establish a one-to-many relationship with the Book model.   
    IssuedBook.hasMany(Book, { foreignKey: "book_id" })
}
module.exports = IssuedBook;