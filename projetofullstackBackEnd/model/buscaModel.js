const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd")

const buscaModel = sequelize.define('Buscas',

    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nameCard: DataTypes.STRING,
        table: DataTypes.STRING
    }

)

module.exports = {

    list: async function () {
        const busca = await buscaModel.findAll()
        return busca;
    },

    save: async function (nameCard, table) {
        const busca = await buscaModel.create({
            nameCard: nameCard,
            table: table
        })
        return busca;
    }

}