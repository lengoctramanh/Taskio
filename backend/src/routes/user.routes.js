const express = require("express");

const router = express.Router();

router.get("/profile", (req, res) => {
  res.json({
    id: 1,
    name: "Demo User",
    email: "demo@gmail.com"
  });
});

router.put("/profile", (req, res) => {
  res.json({
    message: "Profile updated successfully",
    data: req.body
  });
});

module.exports = router;
