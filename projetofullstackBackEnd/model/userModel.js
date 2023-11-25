const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd")

const userModel = sequelize.define('Usuarios',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: DataTypes.STRING,
        usuario: DataTypes.STRING,
        senha: DataTypes.STRING
    }

)

module.exports = {

    list: async function () {

        const user = await userModel.findAll();

        return user;
    },

    save: async function (nome, usuario, pass) {

        const user = userModel.create({
            nome: nome,
            usuario: usuario,
            senha: pass
        })
        return user;
    },

    consultaLogin: async function (usuario) {
        try {
            const user = await userModel.findOne({
                where: {
                    usuario: usuario
                }
            });
            return user;
        } catch (error) {
            console.error("Login ou senha incorretos", error);
            throw error;
        }
    },

    Model: userModel,

}