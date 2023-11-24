const Student = require("../models/Student");
const Book = require("../models/Book");

const getAllStudents = async () => {
    try {
        const students = await Student.findAll();
        if (!students) {
            return "There are no students found";
        }
        return students;
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

    } catch (err) {
        console.error("Error updating student ", err)
    }
}

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

