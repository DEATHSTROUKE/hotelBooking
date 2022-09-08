const ApiError = require("../error/ApiError");
const {Booking} = require('../models/models')

class BookingController {
    async getAll(req, res) {
        const data = await Booking.findAll()
        res.json(data)
    }

    async getOne(req, res) {
        const {id} = req.params
        const data = await Booking.findOne({where: {id}})
        res.json(data)
    }

    async create(req, res, next) {
        try {
            const {name, surname, middlename, email, phone, roomId, first_date, last_date, paid} = req.body
            const data = await Booking.create({
                name,
                surname,
                middlename,
                email,
                phone,
                roomId,
                first_date,
                last_date,
                paid
            })
            res.json(data)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async updateObj(req, res, next) {
        try {
            const {id, name, surname, middlename, email, phone, roomId, first_date, last_date, paid} = req.body
            await Booking.update({
                name,
                surname,
                middlename,
                email,
                phone,
                roomId,
                first_date,
                last_date,
                paid
            }, {where: {id}})
            res.json({success: "ok"})
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async deleteObj(req, res) {
        const {id} = req.params
        await Booking.destroy({where: {id}})
        res.json({success: "ok"})
    }
}


module.exports = new BookingController()