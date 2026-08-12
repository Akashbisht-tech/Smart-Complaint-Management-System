const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const studentSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true, "name is required"],
        trim: true
    },
    studentId : {
        type : String,
        required : [true, "studentId is required"],
        unique: true
    },
    email : {
        type : String,
        required : [true, "email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    password : {
        type : String,
        required : [true, "password is required"]
    }
})

studentSchema.pre("save", async function(next){
    //password modify nhi hua means no new student 
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
})


const studentModel = mongoose.model("Student" , studentSchema );


module.exports = studentModel;