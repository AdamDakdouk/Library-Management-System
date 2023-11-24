const { DataTypes } = require('sequelize');
const sequelize = require("../database/config");
const Student = require("./Student");

const Book = sequelize.define("Book", {
    book_id: {
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

    book_title: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    book_author: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    book_min_age_required: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    book_publication: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    book_availability: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    tableName: "books",
    timestamps: true,
});

module.exports = Book;