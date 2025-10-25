// api/controllers/project.controller.js
const projectService = require('../services/project.service');
const path = require('path');

const projectController = {
    async create(req, res, next) {
        try {
            const { titulo, descripcionCorta, detalles, impacto, imagen } = req.body;

            // Asegurarse de que 'detalles' sea siempre un array
            let detallesArray = [];
            if (typeof detalles === 'string') {
            try {
                detallesArray = JSON.parse(detalles);
            } catch {
                detallesArray = [detalles]; // fallback si viene un string simple
            }
            } else if (Array.isArray(detalles)) {
            detallesArray = detalles;
            }

            const newProject = await projectService.create({
            titulo,
            descripcionCorta,
            imagen,
            detalles: detallesArray,
            impacto
            });

            res.status(201).json({ ok: true, project: newProject });
        } catch (err) {
            console.error('Error al crear proyecto:', err);
            next(err);
        }
    },


    async getAll(req, res, next) {
        try {
            const projects = await projectService.findAll();
            res.set("Cache-Control", "no-store");
            return res.status(200).json({ ok: true, data: projects });
        } catch (error) {
            res.status(500).json({ ok: false, message: error.message });
        }
    },

    async getById(req, res, next) {
        try {
        const project = await projectService.findById(req.params.id);
            res.set("Cache-Control", "no-store");
            return res.status(200).json({ ok: true, data: project });
        } catch (error) {
            res.status(500).json({ ok: false, message: error.message });
        }
    },

    async update(req, res, next) {
        try {
        const { titulo, descripcionCorta, detalles, impacto, imagen } = req.body;
        let detallesArray = [];
        if (typeof detalles === 'string') {
            try {
                detallesArray = JSON.parse(detalles);
            } catch {
                detallesArray = [detalles];
            }
        } else if (Array.isArray(detalles)) {
            detallesArray = detalles;
        }

        const data = { titulo, descripcionCorta, impacto, detalles: detallesArray };
        if (imagen) data.imagen = imagen;

        const project = await projectService.update(req.params.id, data);
        res.json(project);
        } catch (err) {
        next(err);
        }
    },

    async remove(req, res, next) {
        try {
        await projectService.remove(req.params.id);
        res.json({ message: 'Proyecto eliminado' });
        } catch (err) {
        next(err);
        }
    }
};

module.exports = projectController;
