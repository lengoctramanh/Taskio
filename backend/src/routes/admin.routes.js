const express = require("express");

const router = express.Router();

router.get("/users", (req, res) => {
  res.json({
    message: "Get users successfully",
    data: []
  });
});

router.put("/users/:id/status", (req, res) => {
  res.json({
    message: "User status updated successfully",
    id: req.params.id,
    data: req.body
  });
});

router.put("/users/:id/role", (req, res) => {
  res.json({
    message: "User role updated successfully",
    id: req.params.id,
    data: req.body
  });
});

module.exports = router;
