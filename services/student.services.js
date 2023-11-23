const Student = require("../models/Student");
const Book = require("../models/Book");

const getAllStudents = async () => {
    try {
        const student = await Student.findAll({ include: [{ model: Book }] });
        return student;
    } catch (err) {
        console.error('Error getting all students ', err);
    }
}

const getStudentById = async (id) => {
    try {
        const student = await Student.findByPk(id);
        if (!student) {
            return `Student with ID ${id} not found`;
        }

        return student;
    } catch (err) {
        console.error("Error getting student ", err);
    }
}

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
    } catch (err) {
        console.error("Error inserting student ", err)
    }
}

const updateStudent = async (id, firstName, lastName, email, password, mobile, age) => {
    try {

        const updateStudent = new Student.update({
            student_first_name: firstName,
            student_last_name: lastName,
            student_email: email,
            student_password: password,
            student_mobile: mobile,
            student_age: age,
        }, { where: { student_id: id } });

        return updateStudent;

    } catch (err) {
        console.error("Error updating student ", err)
    }
}

const deleteStudent = async (id) => {
    try {
        const student = await Student.findByPk(id);
        if (!student) {
            return "Student not found. Couldn't delete"
        }

        const deletedStudent = await Student.destroy();
        return deletedStudent.toJSON();
    } catch (err) {
        console.error("Error deleting student ", err);
    }
}

module.exports = {
    insertStudent,
    updateStudent,
    getAllStudents,
    getStudentById,
    deleteStudent,
}

