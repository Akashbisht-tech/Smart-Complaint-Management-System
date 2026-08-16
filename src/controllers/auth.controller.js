const studentModel = require("../models/student.model");
const sessionModel = require("../models/session.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt  = require("jsonwebtoken");




async function registrationController(req, res){
    const {name, studentId, email, password} = req.body;

    const student = await studentModel.findOne({
        $or : [
            {email}, 
            {studentId}
        ]
    });
    if(student){
        return res.status(409).json({
            message : "student already exist"
        })
    }
    const newStudent = await studentModel.create({
        name, 
        studentId, 
        email, 
        password
    })

    res.status(201).json({
        message : "studnet created",
        student : {
            name : newStudent.name,
            studentId : newStudent.studentId,
            email : newStudent.email
        }
    })
}



async function loginController(req, res){
    const {email, password} = req.body; 

    const Student =  await studentModel.findOne({email});
    if(!Student){
        return res.status(404).json({
            message : "student does not exist"
        })
    }

    const isMatch = await bcrypt.compare(password, Student.password);
    if(!isMatch){
        return res.status(401).json({
            message : "enter correct email or password"
        })
    }

    const refreshToken = jwt.sign({id : Student._id}, process.env.JWT_SECRET, { expiresIn: '7d' });
    const refreshTokenHash = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");

    const session = await sessionModel.create({
        userid : Student._id,
        refreshTokenHash : refreshTokenHash,
    });


    const accessToken = jwt.sign({id : Student._id, role : Student.role}, process.env.JWT_SECRET, { expiresIn: '15m' });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,      // true in production with HTTPS
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
        message : "student login successfully",
        accessToken
    })


}

async function refreshTokenController(req, res){
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        return res.status(401).json({
            message : "unauthorized"
        })
    }
    let decoded;

    try {
        decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired refresh token"
        });
    }


    const refreshTokenHash = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");

    const session = await sessionModel.findOne({
            refreshTokenHash,
            revoked : false
        });

    if(!session){
        return res.status(401).json({
            message : "no token found"
        })
    }

    const student = await studentModel.findById(decoded.id);

    const accessToken = jwt.sign({
        id : student._id,
        role : student.role
    }, process.env.JWT_SECRET, 
    {
        expiresIn : "15m"
    }
    );

    const newRefreshToken = jwt.sign({
        id : decoded.id,
        // id : student._id,
    }, process.env.JWT_SECRET, 
    {
        expiresIn : "7d"
    }
    );

    const nrefreshTokenHash = crypto
    .createHash("sha256")
    .update(newRefreshToken)
    .digest("hex");

    session.refreshTokenHash = nrefreshTokenHash;
    await session.save();

    res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,      // true in production with HTTPS
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
        message : "access token refreshed successfully", 
        accessToken
    })




}

module.exports = {
    registrationController, 
    loginController,
    refreshTokenController
};