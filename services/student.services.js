const Student = require("../models/Student");
const Book = require("../models/Book");

/**
 * Retrieves all students from the database.
 *
 * @returns {Student[]}
 */
const getAllStudents = async () => {
    try {
        const students = await Student.findAll();
        if (!students) {
            return "There are no students found";
        }
        return students;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Retrieves a student from the database specified by his id
 * 
 * @param {integer} id - ID of the student 
 * @returns {Student} 
 */
const getStudentById = async (id) => {
    try {
        const student = await Student.findByPk(id);
        if (!student) {
            return `Student with ID ${id} not found`;
        }

        return student;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Inserts a new student to the database
 * 
 * @param {string} firstName - Student's first name 
 * @param {string} lastName -  Student's last name 
 * @param {string} email - Student's email
 * @param {string} email - password of email 
 * @param {string} mobile - Phone number 
 * @param {integer} age - Student's age 
 * @returns {Student}
 */
const insertStudent = async (firstName, lastName, email, password, mobile, age) => {
    try {
        const newStudent = await Student.create({
            student_first_name: firstName,
            student_last_name: lastName,
            student_email: email,
            student_password: password,
            student_mobile: mobile,
            student_age: age,
        });

        return newStudent.toJSON();
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Updates the info of a student specified by his id
 * 
 * @param {integer} id - Student's id
 * @param {string} firstName - Student's first name 
 * @param {string} lastName -  Student's last name 
 * @param {string} email - Student's email
 * @param {string} email - password of email 
 * @param {string} mobile - Phone number 
 * @param {integer} age - Student's age 
 * @returns {Student}
 */
const updateStudent = async (id, firstName, lastName, email, password, mobile, age) => {
    try {
        const updatedStudent = await Student.update({
            student_first_name: firstName,
            student_last_name: lastName,
            student_email: email,
            student_password: password,
            student_mobile: mobile,
            student_age: age,
        }, { where: { student_id: id } });

        const updateStudent = await Student.findOne({ where: { student_id: id } });
        return updateStudent;

    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Deletes a student specified by his id
 * 
 * @param {integer} id - ID of the student 
 * @returns {String} 
 */
const deleteStudent = async (id) => {
    try {
        const student = await Student.findByPk(id);
        if (!student) {
            return "Student not found. Couldn't delete";
        }

        // Use the `destroy` method with the `where` option
        const deletedStudent = await Student.destroy({
            where: {
                student_id: id,
            },
        });

        //if student was deleted successfully
        if (deletedStudent > 0) {
            return `Student with ID ${id} deleted successfully:`;;
        } else {
            return "No student was deleted";
        }
    } catch (error) {
        throw new Error(error);
    }
}


module.exports = {
    insertStudent,
    updateStudent,
    getAllStudents,
    getStudentById,
    deleteStudent,
}

