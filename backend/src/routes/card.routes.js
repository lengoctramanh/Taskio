const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
  res.status(201).json({
    message: "Card created successfully",
    data: req.body
  });
});

router.put("/:id", (req, res) => {
  res.json({
    message: "Card updated successfully",
    id: req.params.id,
    data: req.body
  });
});

router.delete("/:id", (req, res) => {
  res.json({
    message: "Card deleted successfully",
    id: req.params.id
  });
});

module.exports = router;
