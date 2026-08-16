const mongoose = require("mongoose");
const complaintModel = require("../models/complaint.model");

async function complaintController(req, res) {
    const {category, description} = req.body;
    const user = req.user;

    const complaint = await complaintModel.create({
        category, 
        description,
        studentId:  user.id

    })

    res.status(201).json({
        complaint
    })
}

async function getComplaints(req, res){
    const complaints = await complaintModel.find({ studentId: req.user.id });
    res.status(200).json({
        message : complaints
    })
}

async function getComplaintById(req, res) {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid complaint ID"
            });
        }

        const complaint = await complaintModel.findOne({
            _id: id,
            studentId: req.user.id
        });

        if (!complaint) {
            return res.status(404).json({
                message: "Complaint not found"
            });
        }

        res.status(200).json({
            message: complaint
        });

    } catch (error) {
        console.log("ERROR:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}


async function updateComplaintStatus(req, res) {
    try{
        const {id} = req.params;
        const {status} = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                message: "Invalid complaint ID"
            });
        }
        const allowStatuses = [
            "pending",
            "in-progress",
            "resolved",
            "rejected"
        ];

        if(!allowStatuses.includes(status)){
            return res.status(400).json({
                message: "Invalid complaint status"
            });
        }

        const complaint = await complaintModel.findByIdAndUpdate(
            id,
            {status},
            {new : true}
        );

        if(!complaint){
            return res.status(404).json({
                message: "Complaint not found"
            });
        }

        res.status(200).json({
            message: "Complaint status updated successfully",
            complaint
        });

        
    } catch(err){
        console.log(err);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = {
    complaintController, 
    getComplaints,
    getComplaintById,
    updateComplaintStatus
};