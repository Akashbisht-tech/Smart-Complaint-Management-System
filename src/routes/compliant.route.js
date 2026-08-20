const express = require("express");
const complaintController = require("../controllers/complaint.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const authorizeRole = require("../middlewares/authorization.middleware");
const router = express.Router();


/**
 * /api/complaint
 */
router.post("/complaint", authMiddleware, complaintController.complaintController );

router.get("/getComplaints", authMiddleware, complaintController.getComplaints );



router.get("/getAllComplaints", authMiddleware, authorizeRole("admin"), complaintController.getAllComplaints );


router.get("/complaint/:id", authMiddleware, complaintController.getComplaintById );



router.patch("/complaints/:id/status",authMiddleware, authorizeRole("admin"),complaintController.updateComplaintStatus);


router.patch("/complaints/:id/assign",authMiddleware, authorizeRole("admin"),complaintController.ComplaintAssigned);






module.exports = router;