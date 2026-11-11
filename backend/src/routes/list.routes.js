const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const listController = require("../controllers/list.controller");

const router = express.Router();

router.use(authMiddleware);

router.param("id", (req, res, next, value) => {
  if (!/^[1-9]\d*$/.test(value) || !Number.isSafeInteger(Number(value))) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }

  req.listId = Number(value);
  next();
});

router.post("/", listController.createList);
router.get("/:id", listController.getListById);
router.put("/:id", listController.updateList);
router.delete("/:id", listController.deleteList);

module.exports = router;