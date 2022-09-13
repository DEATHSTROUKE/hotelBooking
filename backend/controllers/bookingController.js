const ApiError = require("../error/ApiError");
const {Booking, Rooms, Admins} = require('../models/models')
const {Sequelize, Op} = require("sequelize");
const sequelize = require("sequelize");
const FD = [sequelize.fn('to_char', sequelize.col('first_date'), 'dd.mm.YYYY'), 'first_date']
const LD = [sequelize.fn('to_char', sequelize.col('last_date'), 'dd.mm.YYYY'), 'last_date']

class BookingController {
    static dateToDBFormat(date) {
        let parts = date.split('.');
        return new Date(parts[2], parts[1] - 1, parts[0]);
    }

    async getAll(req, res) {
        const rooms = await Booking.findAll({attributes: [[Sequelize.literal('DISTINCT "roomId"'), 'roomId']]});
        const bookings = await Booking.findAll({
            attributes: ['id',
                'name',
                'surname',
                'middlename',
                'email',
                'phone',
                'paid',
                'roomId',
                FD,
                LD],
            order: [['first_date', 'ASC'], ['last_date', 'ASC']]
        })
        let data = []
        for (let i of rooms) {
            let room = await Rooms.findOne({where: {id: i.roomId}})
            room = room.toJSON()
            room.guests = bookings.filter((item) => {
                return item.roomId === i.roomId
            }).map((item) => item.toJSON())
            data.push(room)
        }
        res.json(data)
    }

    async getOne(req, res) {
        const {id} = req.params
        const data = await Booking.findOne({
            attributes: ['id',
                'name',
                'surname',
                'middlename',
                'email',
                'phone',
                'paid',
                'roomId',
                FD,
                LD],
            where: {id}
        })
        res.json(data)
    }

    async getFreeRooms(req, res) {
        let first_date = req.query.first_date
        let last_date = req.query.last_date
        first_date = BookingController.dateToDBFormat(first_date)
        last_date = BookingController.dateToDBFormat(last_date)
        const amount = req.query.amount
        const rooms = await Rooms.findAll({where: {amount}})
        let available_rooms = []
        for (let i of rooms) {
            let books = await Booking.findAndCountAll({
                raw: true,
                where: {
                    roomId: i.id,
                    [Op.or]: [{[Op.and]: [{first_date: {[Op.lte]: first_date}}, {last_date: {[Op.gt]: first_date}}]},
                        {[Op.and]: [{first_date: {[Op.lt]: last_date}}, {last_date: {[Op.gte]: last_date}}]},
                        {[Op.and]: [{first_date: {[Op.gte]: first_date}}, {last_date: {[Op.lte]: last_date}}]}]
                }
            })
            if (i.amount - books.count >= amount) {
                available_rooms.push(i)
            }
        }
        res.json(available_rooms)
    }

    async create(req, res, next) {
        try {
            let {name, surname, middlename, email, phone, roomId, first_date, last_date, paid} = req.body;
            first_date = BookingController.dateToDBFormat(first_date)
            last_date = BookingController.dateToDBFormat(last_date)
            const room = await Rooms.findOne({where: {id: roomId}})
            if (!room) {
                return next(ApiError.badRequest("Room is not defined"))
            }
            console.log(room)
            let bookings = await Booking.findAndCountAll({
                raw: true,
                where: {
                    roomId: room.id,
                    [Op.or]: [{[Op.and]: [{first_date: {[Op.lte]: first_date}}, {last_date: {[Op.gt]: first_date}}]},
                        {[Op.and]: [{first_date: {[Op.lt]: last_date}}, {last_date: {[Op.gte]: last_date}}]},
                        {[Op.and]: [{first_date: {[Op.gte]: first_date}}, {last_date: {[Op.lte]: last_date}}]}]
                }
            })
            console.log(bookings)

            if (room.amount > bookings.count) {
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
            } else {
                return next(ApiError.badRequest("The room is full"))
            }
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async updateObj(req, res, next) {
        try {
            let {id, name, surname, middlename, email, phone, roomId, first_date, last_date, paid} = req.body
            first_date = BookingController.dateToDBFormat(first_date)
            last_date = BookingController.dateToDBFormat(last_date)
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
        const email = req.headers.authorization
        const {id} = req.params
        const book = await Booking.findOne({where: {[Op.and]: [{id, email}]}})
        let admin
        try {
            admin = await Admins.findOne({where: {tg_id: email}})
        } catch {

        }
        if (book || admin) {
            await Booking.destroy({where: {id}})
            res.json({success: "ok"})
        } else {
            res.status(403).json({message: "Forbidden"})
        }
    }
}


module.exports = new BookingController()