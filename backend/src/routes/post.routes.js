const express = require("express");
const postController = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags:
 *       - Posts
 *     responses:
 *       200:
 *         description: Posts fetched successfully
 */
router.get("/", postController.getPosts);


/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get post by id
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post fetched successfully
 */
router.get("/:id", postController.getPost);


/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a post
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - body
 *             properties:
 *               title:
 *                 type: string
 *                 example: My first developer post
 *               body:
 *                 type: string
 *                 example: Building a community platform with Node.js
 *     responses:
 *       201:
 *         description: Post created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, postController.createPost);


module.exports = router;