const express = require("express");
const pool = require("../config/db");
const authRoutes = require("./auth.routes");
const postRoutes = require("./post.routes");
const commentRoutes = require("./comment.routes");
const reactionRoutes = require("./reaction.routes");
const profileRoutes = require("./profile.routes");
const router = express.Router();

router.get("/health", (req, res) => {
  res.json({
    success: true,
    data: {
      status: "ok"
    },
    message: "API is healthy"
  });
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Check API health
 *     tags:
 *       - System
 *     responses:
 *       200:
 *         description: API is healthy
 */

/**
 * @swagger
 * /db-test:
 *   get:
 *     summary: Check database connectivity
 *     tags:
 *       - System
 *     responses:
 *       200:
 *         description: Database connected successfully
 *       500:
 *         description: Database connection failed
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               statusCode: 500
 *               message: Internal server error
 *               errors: []
 */
router.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      success: true,
      data: result.rows[0],
      message: "Database connected successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
      errors: []
    });
  }
});

router.use("/auth", authRoutes);
router.use("/posts", postRoutes);
router.use("/", commentRoutes);
router.use("/", reactionRoutes);
router.use("/", profileRoutes);

module.exports = router;