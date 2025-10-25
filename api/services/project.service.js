// api/services/project.service.js
const Project = require('../models/Project');

const projectService = {
  async create(data) {
    return await Project.create(data);
  },

  async findAll() {
    return await Project.findAll({ order: [['createdAt', 'DESC']] });
  },

  async findById(id) {
    const project = await Project.findByPk(id);
    if (!project) throw new Error('Proyecto no encontrado');
    return project;
  },

  async update(id, data) {
    const project = await Project.findByPk(id);
    if (!project) throw new Error('Proyecto no encontrado');
    return await project.update(data);
  },

  async remove(id) {
    const project = await Project.findByPk(id);
    if (!project) throw new Error('Proyecto no encontrado');
    await project.destroy();
    return true;
  }
};

module.exports = projectService;
