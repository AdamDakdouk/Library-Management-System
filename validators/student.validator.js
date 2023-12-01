const { check } = require("express-validator");

/**
 * Validation middleware for inserting a student.
 */
const insertStudentValidation = [
    // Check if student's first name is not empty
    check("student_first_name").notEmpty().withMessage("First name is required"),

    // Check if student's last name is not empty
    check("student_last_name").notEmpty().withMessage("Last name is required"),

    // Check if student's email is not empty
    check("student_email").isEmail().withMessage("Please enter a valid email"),

    // Check if student's age is not empty
    check("student_age").notEmpty().withMessage("Age is required"),
];

/**
 * Validation middleware for updating a student.
 */
const updateStudentValidation = [
    // Check if student's id is not empty
    check("student_id").notEmpty().withMessage("user ID is required"),

    // Check if student's first name is not empty
    check("student_first_name").notEmpty().withMessage("First name is required"),

    // Check if student's last name is not empty
    check("student_last_name").notEmpty().withMessage("Last name is required"),
    
    // Check if student's email is not empty
    check("student_email").isEmail().withMessage("Please enter a valid email"),

    // Check if student's age is not empty
    check("student_age").notEmpty().withMessage("Age is required"),
];

module.exports = {
    insertStudentValidation,
    updateStudentValidation,
}