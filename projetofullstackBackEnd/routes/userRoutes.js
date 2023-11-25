var express = require('express')
var router = express.Router();
var userDAO = require('../model/userModel')
const sequelize = require('../helpers/bd');
const hashPassword = require('../functions/hashPassword');
const bcrypt = require('bcrypt');


// List all
router.get('/', async (req, res) => {

    let user = await userDAO.list();
    res.json({ status: true, msg: 'Usuarios cadastrados: ', user })
})


// Login
router.post('/login', async (req, res) => {
    const { usuario, senha } = req.body;

    try {
        // Consulta o usuário no banco de dados
        const usuarioCadastrado = await userDAO.consultaLogin(usuario);

        if (usuarioCadastrado) {
            // Desencripta a senha armazenada no banco de dados
            const senhaCorreta = await bcrypt.compare(senha, usuarioCadastrado.senha);

            if (senhaCorreta) {
                res.json({ user: usuarioCadastrado, status: true, msg: "Login efetuado com sucesso"});
            } else {
                res.status(403).json({ status: false, msg: 'Senha incorreta' });
            }
        } else {
            res.status(403).json({ status: false, msg: 'Usuário não encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, msg: 'Erro durante o login', error });
    }
});

// Save
router.post('/', async (req, res) => {

    await sequelize.sync({ force: true })

    const { nome, usuario, senha } = req.body;

    try {
        const hashedPassword = await hashPassword.generatePassword(senha);

        await userDAO.save(nome, usuario, hashedPassword);

        res.json({ status: true, msg: "Usuario cadastrado com sucesso" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, msg: "Usuario não cadastrado", err });
    }

})

module.exports = router;