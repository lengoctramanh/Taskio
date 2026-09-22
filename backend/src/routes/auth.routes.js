const express = require("express");

const router = express.Router();

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  res.status(201).json({
    message: "Register successfully",
    data: {
      id: 1,
      name,
      email
    }
  });
});

router.post("/login", (req, res) => {
  const { email } = req.body;

  res.json({
    message: "Login successfully",
    token: "fake-jwt-token",
    user: {
      id: 1,
      email
    }
  });
});

router.get("/me", (req, res) => {
  res.json({
    id: 1,
    name: "Demo User",
    email: "demo@gmail.com"
  });
});

module.exports = router;