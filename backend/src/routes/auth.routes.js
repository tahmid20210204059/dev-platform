const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new developer
 *     tags:
 *       - Auth
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login developer
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", authController.login);

module.exports = router;