const Student = require("../models/Student");
const Book = require("../models/Book");
const { Op } = require("sequelize");

/**
 * Retrieves all students from the database.
 *
 * @returns {Student[]}
 */
const getAllStudents = async () => {
    try {
        const students = await Student.findAll();
        if (!students || students.length === 0) {
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
 * Gets all students with first or last name similar to the specified one
 * 
 * @param {string} name - Students name
 * @returns {Student[]}
 */
const getStudentsByName = async (firstName, lastName) => {
    try {
        const students = await Student.findAll({
            where: {
                /**
                 * Op.or specifies a logical 'Or' condition between first and last name
                 * " [Op.like]: `%${name}%` ": matches names that contain the specified substring.
                 */
                [Op.or]: [
                    { student_first_name: { [Op.like]: `%${firstName}%` } },
                    { student_last_name: { [Op.like]: `%${lastName}%` } }
                ]
            }
        });

        if (!students || students.length === 0) {
            if (firstName && !lastName) {
                return `No students found with first name: ${firstName}`;
            }
            else {
                return `No students found with the name: ${firstName} ${lastName}`
            }
        }
        return students;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Gets a student from the database based on the phone number
 * 
 * @param {String} mobile - Student's mobile
 * @returns {Student}
 */
const getStudentByMobile = async(mobile) => {
    try {
        const student = await Student.findOne({
            where: {
                student_mobile: mobile.replace(/\s/g, ''),
            }
        });

        if (!student) {
            return null;
        }
        return student;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Gets a student from the database based on the email
 * 
 * @param {String} email - Student's email
 * @returns {Student}
 */
const getStudentByEmail = async(email) => {
    try{
        const student = await Student.findOne({
            where: {
                student_email: email.trim(),
            }
        });

        if (!student) {
            return null;
        }
        
        return student;
    }catch(error){
        throw new Error(error);
    }
}

/**
 * Inserts a new student to the database
 * 
 * @param {string} firstName - Student's first name 
 * @param {string} lastName -  Student's last name 
 * @param {string} email - Student's email
 * @param {string} mobile - Phone number 
 * @param {integer} age - Student's age 
 * @returns {Student}
 */
const insertStudent = async (student) => {
    
    try {
        const newStudent = await Student.create({
            student_first_name: student?.student_first_name,
            student_last_name: student?.student_last_name,
            student_email: student?.student_email,
            student_mobile: student?.student_mobile.replace(/\s/g, ''),
            student_age: student?.student_age,
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
 * @param {string} mobile - Phone number 
 * @param {integer} age - Student's age 
 * @returns {Student}
 */
const updateStudent = async (student) => {
    try {
        const updatedStudent = await Student.update({
            student_first_name: student?.student_first_name,
            student_last_name: student?.student_last_name,
            student_email: student?.student_email,
            student_mobile: student?.student_mobile.replace(/\s/g, ''),
            student_age: student?.student_age,
        }, { where: { student_id: student?.student_id } });

        const updateStudent = await Student.findOne({ where: { student_id: student.student_id } });
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
    getAllStudents,
    getStudentById,
    getStudentsByName,
    getStudentByMobile,
    getStudentByEmail,
    insertStudent,
    updateStudent,
    deleteStudent,
}

