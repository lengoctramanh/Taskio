const prisma = require("../config/prisma");

const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
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

    if (!user) {
      return res.status(404).json({
        message: "User không tồn tại",
      });
    }

    return res.json({
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Lỗi server",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, avatar } = req.body;

    const user = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        ...(name !== undefined && { name }),
        ...(avatar !== undefined && { avatar }),
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
      message: "Profile updated successfully",
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
  getProfile,
  updateProfile,
};