const express = require("express");
const prisma = require("../config/prisma");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.param("id", (req, res, next, value) => {
  if (!/^[1-9]\d*$/.test(value) || !Number.isSafeInteger(Number(value))) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }

  req.cardId = Number(value);
  next();
});

function validateData(body) {
  const data = {};

  if (body.title !== undefined) {
    if (typeof body.title !== "string" || !body.title.trim()) {
      throw new Error("Title phải là chuỗi không rỗng");
    }
    data.title = body.title.trim();
  }

  if (body.description !== undefined) {
    if (body.description !== null && typeof body.description !== "string") {
      throw new Error("Description phải là chuỗi hoặc null");
    }
    data.description = body.description;
  }

  if (body.status !== undefined) {
    if (!["todo", "doing", "done"].includes(body.status)) {
      throw new Error("Status phải là todo, doing hoặc done");
    }
    data.status = body.status;
  }

  if (body.position !== undefined) {
    if (!Number.isSafeInteger(body.position) || body.position < 0) {
      throw new Error("Position phải là số nguyên không âm");
    }
    data.position = body.position;
  }

  if (body.listId !== undefined) {
    if (!Number.isSafeInteger(body.listId) || body.listId <= 0) {
      throw new Error("ListId phải là số nguyên dương");
    }
    data.listId = body.listId;
  }

  if (body.dueDate !== undefined) {
    if (body.dueDate === null) {
      data.dueDate = null;
    } else {
      if (
        typeof body.dueDate !== "string" ||
        !body.dueDate.trim() ||
        Number.isNaN(Date.parse(body.dueDate))
      ) {
        throw new Error("DueDate phải là chuỗi ngày giờ hợp lệ hoặc null");
      }
      data.dueDate = new Date(body.dueDate);
    }
  }

  return data;
}

function ownedCard(id, ownerId) {
  return {
    id,
    list: {
      board: { ownerId },
    },
  };
}

// POST /api/cards
router.post("/", async (req, res, next) => {
  let data;

  try {
    data = validateData(req.body || {});

    if (!data.title || !data.listId) {
      return res.status(400).json({
        message: "Title và listId là bắt buộc",
      });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const card = await prisma.$transaction(async (tx) => {
      const list = await tx.list.findFirst({
        where: {
          id: data.listId,
          board: { ownerId: req.user.id },
        },
        select: { id: true },
      });

      if (!list) return null;

      return tx.card.create({ data });
    });

    if (!card) {
      return res.status(404).json({ message: "Không tìm thấy list" });
    }

    return res.status(201).json({ data: card });
  } catch (error) {
    if (error.code === "P2003") {
      return res.status(404).json({ message: "Không tìm thấy list" });
    }
    next(error);
  }
});

// GET /api/cards/:id
router.get("/:id", async (req, res, next) => {
  try {
    const card = await prisma.card.findFirst({
      where: ownedCard(req.cardId, req.user.id),
    });

    if (!card) {
      return res.status(404).json({ message: "Không tìm thấy card" });
    }

    return res.json({ data: card });
  } catch (error) {
    next(error);
  }
});

// PUT /api/cards/:id
router.put("/:id", async (req, res, next) => {
  let data;

  try {
    data = validateData(req.body || {});

    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        message: "Cần gửi ít nhất một trường hợp lệ để cập nhật",
      });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      // Kiểm tra quyền sở hữu card hiện tại trước khi chuyển list.
      const current = await tx.card.findFirst({
        where: ownedCard(req.cardId, req.user.id),
        select: { id: true },
      });

      if (!current) {
        return { error: "Không tìm thấy card" };
      }

      if (data.listId !== undefined) {
        const targetList = await tx.list.findFirst({
          where: {
            id: data.listId,
            board: { ownerId: req.user.id },
          },
          select: { id: true },
        });

        if (!targetList) {
          return { error: "Không tìm thấy list đích" };
        }
      }

      const card = await tx.card.update({
        where: ownedCard(req.cardId, req.user.id),
        data,
      });

      return { card };
    });

    if (result.error) {
      return res.status(404).json({ message: result.error });
    }

    return res.json({ data: result.card });
  } catch (error) {
    if (error.code === "P2025" || error.code === "P2003") {
      return res.status(404).json({
        message: "Không tìm thấy card hoặc list đích",
      });
    }
    next(error);
  }
});

// DELETE /api/cards/:id
router.delete("/:id", async (req, res, next) => {
  try {
    await prisma.card.delete({
      where: ownedCard(req.cardId, req.user.id),
    });

    return res.json({ message: "Đã xóa card" });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Không tìm thấy card" });
    }
    next(error);
  }
});

module.exports = router;