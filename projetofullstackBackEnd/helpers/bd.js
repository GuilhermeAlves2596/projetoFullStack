const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,
    { host: process.env.DB_HOST, port: process.env.DB_PORT, dialect: process.env.DB_DIALECT })

    sequelize.sync({ force: false });

sequelize.authenticate()
    .then(() => console.log("Conectado no MySQL!"))
    .catch(error => console.log(error))

module.exports = sequelize