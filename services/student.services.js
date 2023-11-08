const Student = require("../model/Student");
const Book = require("../model/Book");

const createStudent = async (student) => {
    try {
        const newStudent = new Student.create({
            student_name: student.student_name,
            student_age: student.student_age,
        })
        return newStudent.toJSON();
    }catch(err){
        console.error("Error creating student ", err)
    }
}

const getAllStudents = async () => {
    try{
        const student = await Student.findAll({ include: [{ model: Book }] });
        return student;
    }catch(err){
        console.error('Error getting all student ', err);
    }
}

const getStudentById = async (id) => {
    try{
        const student = await Student.findByPk(id);
        if(!student){
            return "Student not found";
        }
        
        return student;
    }catch(err){
        console.error("Error getting the student ", err);
    }
}

const updateStudent = async (student) => {
    try {

        const updateStudent = new Student.update({
            student_name: student_name,
            student_age: student.student_age,
        }, { where: {student_id: student.student_id } });

        return updateStudent;

    }catch(err){
        console.error("Error updating student ", err)
    }
}

const deleteStudent = async (id) => {
    try {
        const student = await Student.findByPk(id);
        if(!student){
            return "Student not found. Couldn't delete"
        }

        const deletedStudent = await Student.destroy();
        return deletedStudent.toJSON();
    }catch(err){
        console.error("Error deleting student ", err);
    }
}

module.exports = {
    createStudent,
    updateStudent,
    getAllStudents,
    getStudentById,
    deleteStudent,
}

