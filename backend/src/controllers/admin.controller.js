const prisma = require("../config/prisma");

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.json({
      message: "Get users successfully",
      data: users,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Lỗi server",
    });
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const { status } = req.body;

    if (!["active", "blocked"].includes(status)) {
      return res.status(400).json({
        message: "Status không hợp lệ",
      });
    }

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        status,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.json({
      message: "User status updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Lỗi server",
    });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({
        message: "Role không hợp lệ",
      });
    }

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.json({
      message: "User role updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Lỗi server",
    });
  }
};

module.exports = {
  getUsers,
  updateUserStatus,
  updateUserRole,
};