const { DataTypes } = require('sequelize');
const sequelize = require("../database/config");
const Book = require("./Book");
const Student = require("./Student");

const IssuedBook = sequelize.define('IssuedBook', {
    issue_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    student_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Student',
            key: 'student_id',
        }
    },

    student_first_name: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Student',
            key: 'student_first_name'
        },
    },

    book_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Book',
            key: 'book_id',
        }
    },

    book_title: {
        type: DataTypes.STRING,
        references: {
            model: 'Book',
            key: 'book_title'
        }
    },

}, {
    tableName: 'IssuedBook',
});

IssuedBook.associate = () => {
    IssuedBook.hasOne(Student, { foreignKey: "student_id" })
}

module.exports = IssuedBook;