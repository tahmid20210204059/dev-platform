const express = require("express");
const profileController = require("../controllers/profile.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();


/**
 * @swagger
 * /profile:
 *   post:
 *     summary: Create developer profile
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bio:
 *                 type: string
 *                 example: Backend developer
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - Node.js
 *                   - PostgreSQL
 *               experiences:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - Built REST APIs
 *     responses:
 *       201:
 *         description: Profile created successfully
 */
router.post(
  "/profile",
  authMiddleware,
  profileController.createProfile
);


/**
 * @swagger
 * /profile:
 *   put:
 *     summary: Update developer profile
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bio:
 *                 type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *               experiences:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */
router.put(
  "/profile",
  authMiddleware,
  profileController.updateProfile
);


/**
 * @swagger
 * /profile/{userId}:
 *   get:
 *     summary: Get developer profile
 *     tags:
 *       - Profile
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 */
router.get(
  "/profile/:userId",
  profileController.getProfile
);


module.exports = router;