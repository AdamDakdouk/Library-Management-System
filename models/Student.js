const { DataTypes } = require("sequelize");
const sequelize = require("../database/config");
const Book = require("./Book");

const Student = sequelize.define('Student', {
    student_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    student_first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    student_last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    student_email: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    student_password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    student_mobile: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    student_age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: "students",
    timestamps: true,
});

Student.associate = () => {
    Student.hasMany(Book, { foreignKey: 'student_id' })
}

module.exports = Student;