const {Datatypes} = require("sequelize");
const sequelize = require("../database/config");
const Student = require("./Student");

const Book = sequelize.define("Book", {
    book_id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    student_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    book_title: {
        type: Datatypes.STRING,
        allowNull: false,
    },

    book_author: {
        type: Datatypes.STRING,
        allowNull: false,
    },

    publication: {
        type: Datatypes.DATE,
        allowNull: false,
    },    
}, {
    tableName: "books",
    createdAt: false,
    updatedAt: false,
});

Book.associate = () => {
    Book.belongsTo(Student, {foreignKey: 'student_id'});
}