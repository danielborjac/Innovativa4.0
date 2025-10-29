const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const config = require('../config');

async function getAllUsers({ page = 1, limit = 10, role, is_active }) {
  const where = {};

  if (role) where.role = role;
  if (is_active !== undefined) where.is_active = is_active === 'true';

  const offset = (page - 1) * limit;

  const { rows, count } = await User.findAndCountAll({
    where,
    offset,
    limit: Number(limit),
    order: [['created_at', 'DESC']],
    attributes: { exclude: ['password'] },
  });

  return {
    users: rows,
    pagination: {
      total: count,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(count / limit),
    },
  };
}

async function getUserById(id) {
  return User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });
}

async function updateUser(id, data) {
  const user = await User.findByPk(id);
  if (!user) throw Object.assign(new Error('Usuario no encontrado'), { status: 404 });

  if (data.password) {
    const saltRounds = Number(process.env.PASSWORD_SALT_ROUNDS || config.PASSWORD_SALT_ROUNDS || 12);
    data.password = await bcrypt.hash(data.password, saltRounds);
  }

  // No permitir cambiar ID o crear admins si no eres admin (esto se maneja en middleware)
  await user.update(data);
  return { id: user.id, email: user.email, role: user.role, is_active: user.is_active };
}

async function deleteUser(id) {
  const user = await User.findByPk(id);
  if (!user) throw Object.assign(new Error('Usuario no encontrado'), { status: 404 });
  await user.destroy();
  return true;
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
