const express = require("express");
const complaintController = require("../controllers/complaint.controller");

const router = express.Router();


/**
 * /api/complaint
 */
router.post("/complaint", complaintController.complaintController );





module.exports = router;