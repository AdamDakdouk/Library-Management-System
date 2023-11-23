const express = require('express');
const { getAllStudentsController, getStudentByIdController, insertStudentController,
        updateStudentController, deletedStudentController } = require('../controllers/student.controller');
const { insertStudentValidation, updateStudentValidation } = require('../validators/student.validator');
const router = express.Router();

router.get("/getAllStudents", getAllStudentsController);
router.get("/getStudent", getStudentByIdController);
router.post("/insertStudent", insertStudentValidation, insertStudentController);
router.put("/updateStudent", updateStudentValidation, updateStudentController);
router.delete("/deleteStudent", deletedStudentController);

module.exports = router;