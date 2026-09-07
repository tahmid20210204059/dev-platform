const express = require("express");
const pool = require("../config/db");
const authRoutes = require("./auth.routes");
const postRoutes = require("./post.routes");
const commentRoutes = require("./comment.routes");
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
      message: error.message
    });
  }
});

router.use("/auth", authRoutes);
router.use("/posts", postRoutes);
router.use("/", commentRoutes);

module.exports = router;