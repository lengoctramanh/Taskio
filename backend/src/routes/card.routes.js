const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const cardController = require("../controllers/card.controller");

const router = express.Router();

router.use(authMiddleware);

router.param("id", (req, res, next, value) => {
  if (!/^[1-9]\d*$/.test(value) || !Number.isSafeInteger(Number(value))) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }

  req.cardId = Number(value);
  next();
});

router.post("/", cardController.createCard);
router.get("/:id", cardController.getCardById);
router.put("/:id", cardController.updateCard);
router.delete("/:id", cardController.deleteCard);

module.exports = router;