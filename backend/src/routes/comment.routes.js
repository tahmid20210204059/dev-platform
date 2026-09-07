const express = require("express");
const commentController = require("../controllers/comment.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * @swagger
 * /posts/{id}/comments:
 *   get:
 *     summary: Get comments of a post with nested replies
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comments fetched successfully
 */
router.get(
  "/posts/:id/comments",
  commentController.getComments
);


/**
 * @swagger
 * /posts/{id}/comments:
 *   post:
 *     summary: Create a comment on a post
 *     tags:
 *       - Comments
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
 *               - body
 *             properties:
 *               body:
 *                 type: string
 *                 example: Great post!
 *     responses:
 *       201:
 *         description: Comment created successfully
 */
router.post(
  "/posts/:id/comments",
  authMiddleware,
  commentController.createComment
);


/**
 * @swagger
 * /comments/{id}/replies:
 *   post:
 *     summary: Reply to a comment
 *     tags:
 *       - Comments
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
 *               - body
 *             properties:
 *               body:
 *                 type: string
 *                 example: Thanks for your feedback
 *     responses:
 *       201:
 *         description: Reply created successfully
 */
router.post(
  "/comments/:id/replies",
  authMiddleware,
  commentController.replyComment
);


module.exports = router;