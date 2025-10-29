const userService = require('../services/user.service');

async function getAllUsers(req, res, next) {
  try {
    const { page = 1, limit = 10, role, is_active } = req.query;
    const result = await userService.getAllUsers({ page, limit, role, is_active });
    return res.status(200).json({ ok: true, data: result });
  } catch (err) {
    next(err);
  }
}

async function getUserById(req, res, next) {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    if (!user) return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
    return res.status(200).json({ ok: true, data: user });
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;
    const updated = await userService.updateUser(id, data);
    return res.status(200).json({ ok: true, data: updated });
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    return res.status(200).json({ ok: true, message: 'Usuario eliminado correctamente' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
