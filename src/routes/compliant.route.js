const express = require("express");
const complaintController = require("../controllers/complaint.controller");

const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();


/**
 * /api/complaint
 */
router.post("/complaint", authMiddleware, complaintController.complaintController );

router.get("/complaints", authMiddleware, complaintController.getComplaints );


router.get("/complaint/:id", authMiddleware, complaintController.getComplaintById );





module.exports = router;