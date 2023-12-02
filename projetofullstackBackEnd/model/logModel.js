const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd")

const logModel = sequelize.define('Logs',

    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        msgError: DataTypes.STRING,
    }

)

module.exports = {

    list: async function () {
        const logs = await logModel.findAll()
        return logs;
    },

    save: async function (msgError) {
        const logs = await logModel.create({
            msgError: msgError,
        })
        return logs;
    }

}