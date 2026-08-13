const express = require("express");
const app = express();


app.use(express.json());

const studentRouter = require("../src/routes/student.route");
const complaintRouter = require("../src/routes/compliant.route");


app.use("/api", studentRouter);



app.use("/api", complaintRouter);

module.exports = app;