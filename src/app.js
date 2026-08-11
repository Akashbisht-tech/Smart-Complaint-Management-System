const express = require("express");
const app = express();


app.get("/",(req,res)=>{
    res.send("Smart Complaint Management System API");
})

module.exports = app