const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
  res.status(201).json({
    message: "List created successfully",
    data: req.body
  });
});

router.put("/:id", (req, res) => {
  res.json({
    message: "List updated successfully",
    id: req.params.id,
    data: req.body
  });
});

router.delete("/:id", (req, res) => {
  res.json({
    message: "List deleted successfully",
    id: req.params.id
  });
});

module.exports = router;
