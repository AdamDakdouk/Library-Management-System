const { validationResult } = require("express-validator");
const { getAllStudents, getAllStudentsWithBooks ,getStudentById, insertStudent, updateStudent, deleteStudent } = require("../services/student.services");


/**
 * Retrieves all students from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
const getAllStudentsController = async (req, res) => {
    try {
        const students = await getAllStudents();
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json(err)
    }
}

/**
 * Retrieves a student by ID from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
const getStudentByIdController = async (req, res) => {
    const { student_id } = req.body;

    if (!student_id) {
        return res.status(400).json({ message: "missing student id" });
    }

    try {
        const student = await getStudentById(student_id);
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json(err)
    }
}

/**
 * Inserts a new student into the database after checking the validity of the attributes.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
const insertStudentController = async (req, res) => {

    try {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { student_first_name, student_last_name, student_email,
            student_password, student_mobile, student_age } = req.body;

        const response = await insertStudent(student_first_name, student_last_name, student_email,
            student_password, student_mobile, student_age);

        res.status(201).json({ response });
    } catch (err) {
        res.status(500).json(err)
    }
}

/**
 * Updates a specified student.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
const updateStudentController = async (req, res) => {

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { student_id, student_first_name, student_last_name, student_email,
            student_password, student_mobile, student_age } = req.body;

        const response = await updateStudent(student_id, student_first_name, student_last_name, student_email,
            student_password, student_mobile, student_age);
        res.status(201).json({ response });
    } catch (err) {
        res.status(500).json(err)
    }
}

/**
 * Deletes a specified student.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
const deletedStudentController = async (req, res) => {
    const { student_id } = req.body;
    if (!student_id) {
        return res.status(400).json({ message: "missing student id" });
    }

    try {
        const response = await deleteStudent(student_id);
        res.status(201).json({ response });
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    getAllStudentsController,
    getStudentByIdController,
    insertStudentController,
    updateStudentController,
    deletedStudentController,
}