const ApiError = require("../error/ApiError");
const {Rooms, Admins, Booking} = require('../models/models')

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

    async updateObj(req, res, next) {
        try {
            const {id, number, amount, cost, girl_only, count_photos} = req.body
            await Rooms.update({number, amount, cost, girl_only, count_photos}, {where: {id}})
            res.json({success: "ok"})
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async deleteObj(req, res, next) {
        try{
            const {id} = req.params
            //TODO delete room without bookings
            const book = await Booking.findOne({where: {roomId: id}})
            if (book) {
                return next(ApiError.badRequest('This rooms has bookings'))
            }
            try {
                await Rooms.destroy({where: {id}})
                res.json({success: "ok"})
            } catch (e) {
                return next(ApiError.badRequest(e.message))
            }
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
}


module.exports = new RoomsController()