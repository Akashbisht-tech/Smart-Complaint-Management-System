const complaintModel = require("../models/complaint.model");

async function DashboardController(req, res) {
    const totalComplaints = await complaintModel.countDocuments();

    const pendingComplaints = await complaintModel.countDocuments({
        status: "pending"
    });

    const inProgressComplaints = await complaintModel.countDocuments({
        status: "in-progress"
    });

    const resolvedComplaints = await complaintModel.countDocuments({
        status: "resolved"
    });

    const rejectedComplaints = await complaintModel.countDocuments({
        status: "rejected"
    });

    // Category-wise dynamic count
    const categoryStats = await complaintModel.aggregate([
        {
            $group: {
                _id: "$category",
                count: { $sum: 1 }
            }
        }
    ]);

    const categories = {};

    categoryStats.forEach((item) => {
        categories[item._id] = item.count;
    });

    res.status(200).json({
        totalComplaints,
        pendingComplaints,
        inProgressComplaints,
        resolvedComplaints,
        rejectedComplaints,
        categories
    });
}

module.exports = {
    DashboardController
};