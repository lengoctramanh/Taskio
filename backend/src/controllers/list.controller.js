const prisma = require("../config/prisma");

function validateData(body) {
  const data = {};

  if (body.title !== undefined) {
    if (typeof body.title !== "string" || !body.title.trim()) {
      throw new Error("Title phải là chuỗi không rỗng");
    }

    data.title = body.title.trim();
  }

  if (body.position !== undefined) {
    if (!Number.isSafeInteger(body.position) || body.position < 0) {
      throw new Error("Position phải là số nguyên không âm");
    }

    data.position = body.position;
  }

  return data;
}

async function createList(req, res, next) {
  const body = req.body || {};
  let data;

  try {
    data = validateData(body);

    if (!data.title) {
      return res.status(400).json({ message: "Title là bắt buộc" });
    }

    if (!Number.isSafeInteger(body.boardId) || body.boardId <= 0) {
      return res.status(400).json({
        message: "BoardId phải là số nguyên dương",
      });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const list = await prisma.$transaction(async (tx) => {
      const board = await tx.board.findFirst({
        where: {
          id: body.boardId,
          ownerId: req.user.id,
        },
        select: { id: true },
      });

      if (!board) {
        return null;
      }

      return tx.list.create({
        data: {
          ...data,
          boardId: board.id,
        },
      });
    });

    if (!list) {
      return res.status(404).json({ message: "Không tìm thấy board" });
    }

    return res.status(201).json({ data: list });
  } catch (error) {
    if (error.code === "P2003") {
      return res.status(404).json({ message: "Không tìm thấy board" });
    }

    next(error);
  }
}

async function getListById(req, res, next) {
  try {
    const list = await prisma.list.findFirst({
      where: {
        id: req.listId,
        board: {
          ownerId: req.user.id,
        },
      },
      include: {
        cards: {
          orderBy: [{ position: "asc" }, { id: "asc" }],
        },
      },
    });

    if (!list) {
      return res.status(404).json({ message: "Không tìm thấy list" });
    }

    return res.json({ data: list });
  } catch (error) {
    next(error);
  }
}

async function updateList(req, res, next) {
  let data;

  try {
    data = validateData(req.body || {});

    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        message: "Cần gửi title hoặc position để cập nhật",
      });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const list = await prisma.list.update({
      where: {
        id: req.listId,
        board: {
          ownerId: req.user.id,
        },
      },
      data,
    });

    return res.json({ data: list });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Không tìm thấy list" });
    }

    next(error);
  }
}

async function deleteList(req, res, next) {
  try {
    await prisma.list.delete({
      where: {
        id: req.listId,
        board: {
          ownerId: req.user.id,
        },
      },
    });

    return res.json({ message: "Đã xóa list" });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Không tìm thấy list" });
    }

    next(error);
  }
}

module.exports = {
  createList,
  getListById,
  updateList,
  deleteList,
};