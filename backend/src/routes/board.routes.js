const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
  res.status(201).json({
    message: "Board created successfully",
    data: req.body
  });
});

router.get("/", (req, res) => {
  res.json({
    message: "Get boards successfully",
    data: []
  });
});

router.get("/:id", (req, res) => {
  res.json({
    id: req.params.id,
    name: "Demo Board"
  });
});

router.put("/:id", (req, res) => {
  res.json({
    message: "Board updated successfully",
    id: req.params.id,
    data: req.body
  });
});

router.delete("/:id", (req, res) => {
  res.json({
    message: "Board deleted successfully",
    id: req.params.id
  });
});

module.exports = router;
