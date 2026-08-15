const express = require("express");
const authController = require("../controllers/auth.controller");
const jwt  = require("jsonwebtoken");

const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * /api/registration
 */

router.post("/registration", authController.registrationController );



/**
 * /api/registration
 */
router.post("/login", authController.loginController );


router.post("/refresh-token",authController.refreshTokenController );


module.exports = router;