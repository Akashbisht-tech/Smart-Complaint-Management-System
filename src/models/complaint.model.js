const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true
        },

        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true
        },

        status: {
            type: String,
            enum: ["pending", "in-progress", "resolved", "rejected"],
            default: "pending"
        },

        studentId: {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Student"
        }
    },
    {
        timestamps: true
    }
);

const complaintModel = mongoose.model("Complaint", complaintSchema);

module.exports = complaintModel;