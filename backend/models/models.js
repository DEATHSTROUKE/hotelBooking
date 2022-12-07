const sequelize = require('./index')
const {DataTypes} = require('sequelize')

const Rooms = sequelize.define('rooms', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number: {type: DataTypes.INTEGER, allowNull: false, unique: true},
    amount: {type: DataTypes.INTEGER, allowNull: false},
    cost: {type: DataTypes.INTEGER, allowNull: false},
    girl_only: {type: DataTypes.BOOLEAN, defaultValue: false},
    count_photos: {type: DataTypes.INTEGER},
})

const Booking = sequelize.define('booking', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    middlename: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: false},
    first_date: {type: DataTypes.DATEONLY, allowNull: false},
    last_date: {type: DataTypes.DATEONLY, allowNull: false},
    paid: {type: DataTypes.INTEGER, defaultValue: 0}
})

const Admins = sequelize.define('admins', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING},
    tg_id: {type: DataTypes.STRING, allowNull: false, unique: true},
})

Rooms.hasMany(Booking)
Booking.belongsTo(Rooms)

module.exports = {
    Rooms,
    Booking,
    Admins
}
