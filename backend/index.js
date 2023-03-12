process.env.NODE_ENV !== 'production' ? require('dotenv').config() : null
const express = require('express')
const sequelize = require('./models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
//const {createAgent} = require('@forestadmin/agent');
//const {createSequelizeDataSource} = require('@forestadmin/datasource-sequelize');

const PORT = process.env.PORT || 5000
const app = express()
//createAgent({
//    authSecret: process.env.FOREST_AUTH_SECRET,
//    envSecret: process.env.FOREST_ENV_SECRET,
//    isProduction: process.env.NODE_ENV === 'production',
//}).addDataSource(createSequelizeDataSource(sequelize)).mountOnExpress(app).start();

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'public')))
app.use('/api', router)
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({alter: {drop: false}})
        app.listen(PORT, () => console.log(`Server start on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
