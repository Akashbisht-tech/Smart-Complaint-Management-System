const express = require("express");
const DashboardController = require("../controllers/dashboard.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const authorizeRole = require("../middlewares/authorization.middleware");

const router = express.Router();


/**
 * /api/admin/dashboard
 */
router.get("/admin/dashboard",authMiddleware, authorizeRole("admin") , DashboardController.DashboardController );





module.exports = router;