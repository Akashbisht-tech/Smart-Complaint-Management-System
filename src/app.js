const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");


app.use(express.json());
app.use(cookieParser());

const studentRouter = require("../src/routes/student.route");
const complaintRouter = require("../src/routes/compliant.route");
const authRouter = require("./routes/auth.route")


app.use("/api", studentRouter);

app.use("/api", authRouter);



app.use("/api", complaintRouter);

module.exports = app;