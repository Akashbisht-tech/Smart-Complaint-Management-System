const express = require("express");
const StudentController = require("../controllers/student.controller")

const router = express.Router();


/**
 * /api/test-student
 */
router.post("/test-student", StudentController.createStudentController );





module.exports = router;