const { check } = require("express-validator");

const insertStudentValidation = [
    check("student_first_name").notEmpty().withMessage("First name is required"),
    check("student_last_name").notEmpty().withMessage("Last name is required"),
    check("student_password").notEmpty().withMessage("Password is empty"),
    check("student_password").isLength({ min: 8 }).withMessage("Your password is too short"),
    check("student_email").isEmail().withMessage("Please enter a valid email"),
    check("student_age").notEmpty().withMessage("Age is required"),
];

const updateStudentValidation = [
    check("student_id").notEmpty().withMessage("user ID is required"),
    check("student_first_name").notEmpty().withMessage("First name is required"),
    check("student_last_name").notEmpty().withMessage("Last name is required"),
    check("student_password").notEmpty().withMessage("Password is empty"),
    check("student_password").isLength({ min: 6 }).withMessage("Your password is too short"),
    check("student_password").isStrongPassword().withMessage("Your password is not strong"),
    check("student_email").isEmail().withMessage("Please enter a valid email"),
    check("student_age").notEmpty().withMessage("Age is required"),
];

module.exports = {
    insertStudentValidation,
    updateStudentValidation,
}