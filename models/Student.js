const {Datatypes} = require("sequelize");
const sequelize = require("../database/config");
const Book = require("./Book");

const Student = sequelize.define('Student', {
    student_id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    student_name: {
        type: Datatypes.STRING,
        allowNull: false,
    },

    student_age: {
        type: Datatypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: "students",
    createdAt: false,
    updatedAt: false,
});

Student.associate = () => {
    Student.hasMany(Book, {foreignKey: 'book_id'})
}