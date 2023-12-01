const { DataTypes } = require("sequelize");
const sequelize = require("../database/config");
const Book = require("./Book");

/**
 * Sequelize model for representing students.
 *
 * @class
 */
const Student = sequelize.define('Student', {

    // Primary key for the student.
    student_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    // First name of the student.
    student_first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    // Last name of the student.
    student_last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    // Email address of the student.
    student_email: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    // Password associated with the student's account.
    student_password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    // Mobile number of the student (optional).
    student_mobile: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    // Age of the student.
    student_age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: "students",
    timestamps: true,
});

/**
 * Define associations with other models.
 */
Student.associate = () => {
    // Establish a one-to-many relationship with the Book model.
    Student.hasMany(Book, { foreignKey: 'student_id' })
}

module.exports = Student;