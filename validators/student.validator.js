const { check } = require("express-validator");
const { getStudentByMobile, getStudentByEmail } = require("../services/student.services");

/**
 * Validation middleware for inserting a student.
 */
const insertStudentValidation = [
    // Check if student's first name is not empty
    check("student.student_first_name").notEmpty().withMessage("First name is required"),

    // Check if student's last name is not empty
    check("student.student_last_name").notEmpty().withMessage("Last name is required"),

    // Check if student's email already exists / is not empty
    check("student.student_email").isEmail().withMessage("Please enter a valid email")
    .custom(async (email) => {
        const existingStudent = await getStudentByEmail(email);
        if (existingStudent) {
            throw new Error("Email already exists");
        }
    }),

    //Check if mobile number already exists / is not empty
    check("student.student_mobile").notEmpty().withMessage("Mobile number is required")
    .matches(/^\s*\d[\d\s]*\s*$/).withMessage("Mobile number must contain only numeric digits")
    .custom(async (mobile) => {
        const existingStudent = await getStudentByMobile(mobile);
        if (existingStudent) {
            throw new Error("Mobile number already exists");
        }
    }),

    // Check if student's age is not empty
    check("student.student_age").notEmpty().withMessage("Age is required"),
];

/**
 * Validation middleware for updating a student.
 */
const updateStudentValidation = [
    // Check if student's id is not empty
    check("student.student_id").notEmpty().withMessage("user ID is required"),

    // Check if student's first name is not empty
    check("student.student_first_name").notEmpty().withMessage("First name is required"),

    // Check if student's last name is not empty
    check("student.student_last_name").notEmpty().withMessage("Last name is required"),

    // Check if student's email is not empty
    check("student.student_email").isEmail().withMessage("Please enter a valid email")
        .custom(async (email, { req }) => {
            const existingStudent = await getStudentByEmail(email);
            const id1 = parseInt(req.body.student.student_id , 10);
            const id2 = existingStudent.student_id;
            if (existingStudent && id1 !== id2) {
                throw new Error("Email already exists");
            }
        }),

    // Check if student's age is not empty
    check("student.student_age").notEmpty().withMessage("Age is required"),

    /// Check if student's mobile not empty, already exists, or is valid
    check("student.student_mobile").notEmpty().withMessage("Mobile number is required")
    .matches(/^\s*\d[\d\s]*\s*$/).withMessage("Mobile number must contain only numeric digits")
    .custom(async (mobile, { req }) => {
        const existingStudent = await getStudentByMobile(mobile);
        const id1 = parseInt(req.body.student.student_id , 10);
        const id2 = existingStudent.student_id;
        if (existingStudent && id1 !== id2) {
            throw new Error("Mobile already exists");
        }
    }),
];

module.exports = {
    insertStudentValidation,
    updateStudentValidation,
}