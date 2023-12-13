const express = require('express');
const { getAllStudentsController, getStudentByIdController, insertStudentController,
    updateStudentController, authenticateController, getStudentsByNameController, 
    getStudentByMobileController, deleteStudentController, getStudentByEmailController } = require('../controllers/student.controller');
const { insertStudentValidation, updateStudentValidation } = require('../validators/student.validator');
const authenticateToken = require('./middleware');
const router = express.Router();

router.get("/getAllStudents", getAllStudentsController);
router.get("/getStudentById", getStudentByIdController);
router.get("/getStudentByName", getStudentsByNameController);
router.get("/getStudentByMobile", getStudentByMobileController);
router.get("/getStudentByEmail", getStudentByEmailController);
router.post("/insertStudent", insertStudentValidation, insertStudentController);
router.post("/updateStudent", updateStudentValidation, updateStudentController);
router.delete("/deleteStudent", deleteStudentController);

router.get("/authenticate", authenticateController);

module.exports = router;