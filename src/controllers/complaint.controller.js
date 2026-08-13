const complaintModel = require("../models/complaint.model");

async function complaintController(req, res) {
    const {category, description} = req.body;

    const complaint = await complaintModel.create({
        category, 
        description
    })

    res.status(201).json({
        complaint
    })
}

module.exports = {complaintController};