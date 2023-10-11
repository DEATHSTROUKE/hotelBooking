const ApiError = require("../error/ApiError");
const { Admins } = require("../models/models");

class AdminsController {
  async getAll(req, res) {
    const { tg_id } = req.query;
    let data;
    if (tg_id) {
      data = await Admins.findOne({ where: { tg_id } });
    } else {
      data = await Admins.findAll();
    }
    res.json(data);
  }

  async getOne(req, res, next) {
    const { id } = req.params;
    if (!id) {
      return next(ApiError.badRequest("id is not in query params"));
    }
    const data = await Admins.findOne({ where: { id } });
    res.json(data);
  }

  async create(req, res, next) {
    try {
      const data = req.body;
      if (!data.role) {
        data.role = "admin";
      }
      const admin = await Admins.create(data);
      res.json(admin);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async compare(req, res) {
    const { tg_id } = req.body;
    const admin = await Admins.findOne({ where: { tg_id } });
    if (admin) {
      res.json({ access: true });
    } else {
      res.json({ access: false });
    }
  }

  async updateObj(req, res, next) {
    try {
      const data = req.body;
      await Admins.update(
        { tg_id: data.tg_id, name: data.name, role: data.role },
        { where: { id: data.id } }
      );
      res.json({ success: "ok" });
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async deleteObj(req, res, next) {
    try {
      const { id } = req.params;
      await Admins.destroy({ where: { id } });
      res.json({ success: "ok" });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new AdminsController();
