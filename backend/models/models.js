const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Rooms = sequelize.define('rooms', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number: {type: DataTypes.INTEGER, allowNull: false, unique: true},
    amount: {type: DataTypes.INTEGER, allowNull: false}
})

const Booking = sequelize.define('booking', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: false},
    first_date: {type: DataTypes.DATEONLY, allowNull: false},
    last_date: {type: DataTypes.DATEONLY, allowNull: false}
})

Rooms.hasMany(Booking)
Booking.belongsTo(Rooms)

module.exports = {
    Rooms,
    Booking
}
