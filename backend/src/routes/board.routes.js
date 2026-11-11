const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const boardController = require("../controllers/board.controller");

const router = express.Router();

router.use(authMiddleware);

router.param("id", (req, res, next, value) => {
  if (!/^[1-9]\d*$/.test(value) || !Number.isSafeInteger(Number(value))) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }

  req.boardId = Number(value);
  next();
});

router.post("/", boardController.createBoard);
router.get("/", boardController.getBoards);
router.get("/:id", boardController.getBoardById);
router.put("/:id", boardController.updateBoard);
router.delete("/:id", boardController.deleteBoard);

module.exports = router;