const studentModel = require("../models/student.model");

async function createStudentController(req, res) {
    const {name, studentId, email, password} = req.body;

    const student = await studentModel.create({
        name, 
        studentId, 
        email, 
        password
    })

    res.status(201).json({
        student
    })
}

module.exports = {createStudentController};