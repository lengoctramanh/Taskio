const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

const {
  getUsers,
  updateUserStatus,
  updateUserRole,
} = require("../controllers/admin.controller");

const router = express.Router();

router.use(authMiddleware, adminMiddleware);

router.get("/users", getUsers);

router.put("/users/:id/status", updateUserStatus);

router.put("/users/:id/role", updateUserRole);

module.exports = router;