const ApiError = require("../error/ApiError");
const {Rooms, Admins} = require('../models/models')

class RoomsController {
    async getAll(req, res) {
        const data = await Rooms.findAll()
        res.json(data)
    }

    async getOne(req, res) {
        const {id} = req.params
        const data = await Rooms.findOne({where: {id}})
        res.json(data)
    }

    async create(req, res, next) {
        try {
            const {number, amount, cost, girl_only, count_photos} = req.body
            const room = await Rooms.create({number, amount, cost, girl_only, count_photos})
            res.json(room)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async updateObj(req, res) {
        try {
            const {id, number, amount, cost, girl_only, count_photos} = req.body
            await Rooms.update({number, amount, cost, girl_only, count_photos}, {where: {id}})
            res.json({success: "ok"})
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async deleteObj(req, res) {
        const {id} = req.params
        await Rooms.destroy({where: {id}})
        res.json({success: "ok"})
    }
}


module.exports = new RoomsController()