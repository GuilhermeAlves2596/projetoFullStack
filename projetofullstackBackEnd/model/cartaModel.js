const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd")

const cartaModel = sequelize.define('Carta',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        image: DataTypes.STRING,
        name: DataTypes.STRING,
        status: DataTypes.STRING,
        species: DataTypes.STRING,
        gender: DataTypes.STRING,
    }

)

module.exports = {

    list: async function () {
        const carta = await cartaModel.findAll()
        return carta;
    },

    save: async function (image, name, status, species, gender) {
        const carta = await cartaModel.create({
            image: image,
            name: name,
            status: status,
            species: species,
            gender: gender
        })
        return carta;
    },

    delete: async function (id) {
        const carta = await cartaModel.findByPk(id)
        return carta.destroy()
    },

    getCardByName: async function (name) {
        try {
            const card = await cartaModel.findOne({
                where: {
                    name: name,
                }
            })
            return card;
        } catch (error) {
            console.error('Erro ao buscar uma carta', error)
            throw error
        }
    }

}