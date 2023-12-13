const { validationResult } = require("express-validator");
const { getAllStudents, getStudentById, insertStudent,
        updateStudent, deleteStudent, getStudentsByName, getStudentByMobile, getStudentByEmail } = require("../services/student.services");
const jwt = require("jsonwebtoken");

/**
 * Authenticates a student based on the provided student ID.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
const authenticateController = async (req, res) => {
    const { student } = req.body;
    if (!student) {
        return res.status(401).json({ message: "Missing data" });
    }

    const result = await getStudentById(student?.id);
    if (!result) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = jwt.sign({ student_id: result?.student_id }, process.env.SECRET_KEY);
    res.status(200).json({ message: "Authenticated", student: result, token: token });
}

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
    } catch (error) {
        res.status(500).json(`Error getting all students: ${error}`);
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
        return res.status(400).json("Missing student id" );
    }

    try {
        const student = await getStudentById(student_id.trimStart());
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json(`Error getting student: ${error}`);
    }
}

/**
 * Gets all students with first or last name similar to the specified one
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void}
 */
const getStudentsByNameController = async(req, res) => {
    const { student_name } = req.body;

    if(!student_name){
        return res.status(400).json( "Missing student name" );
    }

    const first_name = student_name.trimStart().split(" ")[0];
    const last_name = student_name.trimStart().split(" ")[1];
    try{
        const students  = await getStudentsByName(first_name, last_name);
        res.status(200).json(students);
    }catch(error){
        res.status(500).json(`Error getting student: ${error}`);
    }
}

/**
 * Gets a student based on a specified mobile number
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getStudentByMobileController = async(req, res) => {
    const { student_mobile } = req.body;
    
    if(!student_mobile) {
        return res.status(400).json("Missing mobile number" );
    }

    try{
        const student = await getStudentByMobile(student_mobile);
        if(!student){
            return res.status(400).json(`There is no student with mobile ${student_mobile}`);
        }
        res.status(200).json(student);
    }catch(error){
        res.status(500),json(`Error getting student: ${error}`);
    }
}

/**
 * Searches for a student in the database based on email
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
const getStudentByEmailController = async(req, res) => {
    const { student_email } = req.body;
    
    if(!student_email) {
        return res.status(400).json("Missing email" );
    }

    try{
        const student = await getStudentByEmail(student_email);
        if(!student){
            return res.status(400).json(`There is no student with email ${student_email}`);
        }
        res.status(200).json(student);
    }catch(error){
        res.status(500),json(`Error getting student: ${error}`);
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

        const {student} = req.body;
        const response = await insertStudent(student);
        res.status(201).json({ response });
        // res.render("Student", response);
    } catch (error) {
        res.status(500).json(`Error inserting student: ${error}`);
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
        const { student } = req.body;

        const response = await updateStudent(student);
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json(`Error updating student: ${error}`);
    }
}

/**
 * Deletes a specified student.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
const deleteStudentController = async (req, res) => {
    const { student_id } = req.body;
    if (!student_id) {
        return res.status(400).json({ message: "missing student id" });
    }

    try {
        const response = await deleteStudent(student_id);
        res.status(201).json({ response });
    } catch (error) {
        res.status(500).json(`Error: Student has a book issued to him, cannot delete.`);
    }
}

module.exports = {
    authenticateController,
    getAllStudentsController,
    getStudentByIdController,
    getStudentsByNameController,
    getStudentByMobileController,
    getStudentByEmailController,
    insertStudentController,
    updateStudentController,
    deleteStudentController,
}