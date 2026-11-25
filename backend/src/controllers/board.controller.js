const prisma = require("../config/prisma");

function boardData(body) {
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

  return data;
}

async function createBoard(req, res, next) {
  let data;

  try {
    data = boardData(req.body || {});
    if (!data.title) {
      return res.status(400).json({ message: "Title là bắt buộc" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const board = await prisma.board.create({
      data: { ...data, ownerId: req.user.id },
    });

    return res.status(201).json({ data: board });
  } catch (error) {
    next(error);
  }
}

async function getBoards(req, res, next) {
  try {
    const boards = await prisma.board.findMany({
      where: { ownerId: req.user.id },
      orderBy: { createdAt: "desc" },
    });

    return res.json({ data: boards });
  } catch (error) {
    next(error);
  }
}

async function getBoardById(req, res, next) {
  try {
    const board = await prisma.board.findFirst({
      where: { id: req.boardId, ownerId: req.user.id },
      include: {
        lists: {
          orderBy: [{ position: "asc" }, { id: "asc" }],
          include: {
            cards: {
              orderBy: [{ position: "asc" }, { id: "asc" }],
            },
          },
        },
      },
    });

    if (!board) {
      return res.status(404).json({ message: "Không tìm thấy board" });
    }

    return res.json({ data: board });
  } catch (error) {
    next(error);
  }
}

async function updateBoard(req, res, next) {
  let data;

  try {
    data = boardData(req.body || {});
    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        message: "Cần gửi title hoặc description để cập nhật",
      });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const board = await prisma.board.update({
      where: { id: req.boardId, ownerId: req.user.id },
      data,
    });

    return res.json({ data: board });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Không tìm thấy board" });
    }
    next(error);
  }
}

async function deleteBoard(req, res, next) {
  try {
    await prisma.board.delete({
      where: { id: req.boardId, ownerId: req.user.id },
    });

    return res.json({ message: "Đã xóa board" });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Không tìm thấy board" });
    }
    next(error);
  }
}

module.exports = {
  createBoard,
  getBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
};