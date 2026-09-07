const express = require("express");

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

module.exports = router;