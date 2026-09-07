const express = require("express");
const reactionController = require("../controllers/reaction.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();


/**
 * @swagger
 * /posts/{id}/reaction:
 *   post:
 *     summary: Toggle reaction on post
 *     tags:
 *       - Reactions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *             properties:
 *               type:
 *                 type: string
 *                 enum:
 *                   - like
 *                   - dislike
 *     responses:
 *       200:
 *         description: Reaction toggled successfully
 */
router.post(
  "/posts/:id/reaction",
  (req, res, next) => {
    req.reactionTargetType = "post";
    next();
  },
  authMiddleware,
  reactionController.toggleReaction
);



/**
 * @swagger
 * /comments/{id}/reaction:
 *   post:
 *     summary: Toggle reaction on comment
 *     tags:
 *       - Reactions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *             properties:
 *               type:
 *                 type: string
 *                 enum:
 *                   - like
 *                   - dislike
 *     responses:
 *       200:
 *         description: Reaction toggled successfully
 */
router.post(
  "/comments/:id/reaction",
  (req, res, next) => {
    req.reactionTargetType = "comment";
    next();
  },
  authMiddleware,
  reactionController.toggleReaction
);



/**
 * @swagger
 * /reaction/{id}/counts:
 *   get:
 *     summary: Get reaction counts
 *     tags:
 *       - Reactions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: targetType
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - post
 *             - comment
 *     responses:
 *       200:
 *         description: Reaction counts fetched successfully
 */
router.get(
  "/reaction/:id/counts",
  reactionController.getReactionCounts
);



/**
 * @swagger
 * /reaction/{id}/user:
 *   get:
 *     summary: Get current user reaction
 *     tags:
 *       - Reactions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: targetType
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - post
 *             - comment
 *     responses:
 *       200:
 *         description: User reaction fetched successfully
 */
router.get(
  "/reaction/:id/user",
  authMiddleware,
  reactionController.getUserReaction
);


module.exports = router;