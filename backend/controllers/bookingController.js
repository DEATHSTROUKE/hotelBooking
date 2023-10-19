const ApiError = require("../error/ApiError");
const { Booking, Rooms, Admins } = require("../models/models");
const { Sequelize, Op } = require("sequelize");
const sequelize = require("sequelize");
const { transporter } = require("../mailConfig");

const FD = [
  sequelize.fn("to_char", sequelize.col("first_date"), "dd.mm.YYYY"),
  "first_date",
];
const LD = [
  sequelize.fn("to_char", sequelize.col("last_date"), "dd.mm.YYYY"),
  "last_date",
];

class BookingController {
  constructor() {}

  static dateToDBFormat(date) {
    try {
      let parts = date.split(".");
      return new Date(parts[2], parts[1] - 1, parts[0]);
    } catch (e) {
      return "bad date";
    }
  }

  static DateToCorrectFormat(date) {
    try {
      let parts = date.split("-");
      return parts[2] + "." + parts[1] + "." + parts[0];
    } catch (e) {
      return "bad date";
    }
  }

  static isRoomFree(first_date, last_date) {
    return [
      {
        [Op.and]: [
          { first_date: { [Op.lte]: first_date } },
          { last_date: { [Op.gt]: first_date } },
        ],
      },
      {
        [Op.and]: [
          { first_date: { [Op.lt]: last_date } },
          { last_date: { [Op.gte]: last_date } },
        ],
      },
      {
        [Op.and]: [
          { first_date: { [Op.gte]: first_date } },
          { last_date: { [Op.lte]: last_date } },
        ],
      },
    ];
  }

  async getAll(req, res, next) {
    try {
      const rooms = await Booking.findAll({
        attributes: [[Sequelize.literal('DISTINCT "roomId"'), "roomId"]],
      });
      let first_date =
        req.query.first_date ||
        new Date().toLocaleDateString("en-GB").split("/").join(".");
      let last_date = req.query.last_date;
      let obj_date = {};

      if (first_date) {
        first_date = BookingController.dateToDBFormat(first_date);
        if (first_date === "bad date") {
          return next(ApiError.badRequest("Incorrect date format"));
        }
      }
      if (last_date) {
        last_date = BookingController.dateToDBFormat(last_date);
        if (last_date === "bad date") {
          return next(ApiError.badRequest("Incorrect date format"));
        }
      }

      if (first_date && last_date) {
        obj_date = {
          [Op.or]: [
            {
              [Op.and]: [
                { first_date: { [Op.gte]: first_date } },
                { first_date: { [Op.lte]: last_date } },
              ],
            },
            {
              [Op.and]: [
                { last_date: { [Op.gte]: first_date } },
                { last_date: { [Op.lte]: last_date } },
              ],
            },
          ],
        };
      } else if (first_date) {
        obj_date = {
          [Op.or]: [
            {
              first_date: { [Op.gte]: first_date },
            },
            {
              last_date: { [Op.gte]: first_date },
            },
          ],
        };
      } else if (last_date) {
        obj_date = {
          [Op.or]: [
            {
              first_date: { [Op.lte]: last_date },
            },
            {
              last_date: { [Op.lte]: last_date },
            },
          ],
        };
      }

      const bookings = await Booking.findAll({
        attributes: [
          "id",
          "name",
          "surname",
          "middlename",
          "email",
          "phone",
          "paid",
          "roomId",
          FD,
          LD,
        ],
        order: [
          ["first_date", "ASC"],
          ["last_date", "ASC"],
        ],
        where: obj_date,
      });

      let data = [];
      for (let i of rooms) {
        let room = await Rooms.findOne({ where: { id: i.roomId } });
        room = room.toJSON();
        room.guests = bookings
          .filter((item) => {
            return item.roomId === i.roomId;
          })
          .map((item) => item.toJSON());
        data.push(room);
      }

      res.json(data);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async getOne(req, res) {
    const { id } = req.params;
    const data = await Booking.findOne({
      attributes: [
        "id",
        "name",
        "surname",
        "middlename",
        "email",
        "phone",
        "paid",
        "roomId",
        FD,
        LD,
      ],
      where: { id },
    });
    res.json(data);
  }

  async getFreeRooms(req, res, next) {
    try {
      let first_date = req.query.first_date;
      let last_date = req.query.last_date;
      first_date = BookingController.dateToDBFormat(first_date);
      last_date = BookingController.dateToDBFormat(last_date);

      if (first_date === "bad date" || last_date === "bad date") {
        return next(ApiError.badRequest("Incorrect date format"));
      }
      if (first_date > last_date) {
        return next(ApiError.badRequest("First date more them last date"));
      }

      const amount = Number(req.query.amount);
      const is_family = req.query.is_family || false;
      let rooms;

      if (is_family != "false" && is_family) {
        rooms = await Rooms.findAll({ where: { amount, is_family } });
      } else {
        rooms = await Rooms.findAll({ where: { amount } });
      }

      let available_rooms = [];
      for (let i of rooms) {
        let books = await Booking.findAndCountAll({
          raw: true,
          where: {
            roomId: i.id,
            [Op.or]: BookingController.isRoomFree(first_date, last_date),
          },
        });
        console.log(books.count);
        if (books.count === 0) {
          available_rooms.push(i);
        }
      }
      res.json(available_rooms);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  create = async (req, res, next) => {
    try {
      let {
        name,
        surname,
        middlename,
        email,
        phone,
        roomId,
        first_date,
        last_date,
        paid,
      } = req.body;

      first_date = BookingController.dateToDBFormat(first_date);
      last_date = BookingController.dateToDBFormat(last_date);
      if (first_date === "bad date" || last_date === "bad date") {
        return next(ApiError.badRequest("Incorrect date format"));
      }
      if (first_date > last_date) {
        return next(ApiError.badRequest("First date more them last date"));
      }
      const room = await Rooms.findOne({ where: { id: roomId } });
      if (!room) {
        return next(ApiError.badRequest("Room is not defined"));
      }

      let bookings = await Booking.findAndCountAll({
        raw: true,
        where: {
          roomId: room.id,
          [Op.or]: BookingController.isRoomFree(first_date, last_date),
        },
      });

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
          paid,
        });

        console.log("booking data", data);

        await this.sendBookingEmail({
          room,
          name,
          surname,
          middlename,
          data,
        });
        await this.sendBookingEmail({
          email: process.env.EMAIL_HOTEL,
          room,
          name,
          surname,
          middlename,
          data,
        });

        await this.sendBookingEmail({
          email: process.env.EMAIL_HOTEL2,
          room,
          name,
          surname,
          middlename,
          data,
        });

        res.json(data);
      } else {
        return next(ApiError.badRequest("The room is full"));
      }
    } catch (e) {
      console.log(e.message);
      return next(ApiError.badRequest(e.message));
    }
  };

  sendBookingEmail = async ({
    email,
    room,
    name,
    surname,
    middlename,
    data,
  }) => {
    let mailOptions = this.makeMailOptions({
      email: email || data.email,
      room,
      name,
      surname,
      middlename,
      data,
      toHotel: email !== undefined,
    });
    let infoObj;
    await transporter.sendMail(mailOptions, function (e, info) {
      if (e) {
        return console.log(e);
      }
      console.log("Message sent: " + info.response);
      infoObj = info;
    });
    return infoObj?.response;
  };

  makeMailOptions({ email, room, name, surname, middlename, data, toHotel }) {
    return {
      from: process.env.EMAIL_LOGIN,
      to: email,
      subject: "Бронирование гостиницы Grand Уют",
      html: `Комната №${
        room.number
      } забронирована на имя ${surname} ${name} ${middlename} с ${BookingController.DateToCorrectFormat(
        data.first_date
      )} по ${BookingController.DateToCorrectFormat(data.last_date)} ${
        !toHotel
          ? "<br> Отменить бронирование можно по телефону, указанному на сайте гостиницы"
          : `<br> Номер телефона клиента: ${data.phone} <br> Почта клиента: ${data.email}`
      }
      `,
    };
  }

  async testEmail(req, res) {
    let email = "andrey.burakov.03@mail.ru";
    let data = "123123";
    const mailOptions = {
      from: process.env.EMAIL_LOGIN,
      to: email,
      subject: "Бронирование гостиницы Grand Уют",
      text: "Привет",
      html: `${data} <a>Здравствуй</a>`,
    };
    await transporter.sendMail(mailOptions, function (e, info) {
      if (e) {
        return console.log(e);
      }
      console.log("Message sent: " + info.response);
      res.json(info.response);
    });
  }

  async updateObj(req, res, next) {
    try {
      let {
        id,
        name,
        surname,
        middlename,
        email,
        phone,
        roomId,
        first_date,
        last_date,
        paid,
      } = req.body;

      first_date = BookingController.dateToDBFormat(first_date);
      last_date = BookingController.dateToDBFormat(last_date);
      if (first_date === "bad date" || last_date === "bad date") {
        return next(ApiError.badRequest("Incorrect date format"));
      }
      if (first_date > last_date) {
        return next(ApiError.badRequest("First date more them last date"));
      }

      await Booking.update(
        {
          name,
          surname,
          middlename,
          email,
          phone,
          roomId,
          first_date,
          last_date,
          paid,
        },
        { where: { id } }
      );

      res.json({ success: "ok" });
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async deleteObj(req, res, next) {
    const email = req.headers.authorization;
    const { id } = req.params;
    const book = await Booking.findOne({
      where: { [Op.and]: [{ id, email }] },
    });
    let admin;
    try {
      admin = await Admins.findOne({ where: { tg_id: email } });
    } catch {}
    if (book || admin) {
      try {
        await Booking.destroy({ where: { id } });
        res.json({ success: "ok" });
      } catch (e) {
        return next(ApiError.badRequest(e.message));
      }
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  }
}

module.exports = new BookingController();
