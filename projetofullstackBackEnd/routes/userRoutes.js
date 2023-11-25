var express = require('express')
var router = express.Router();
var userDAO = require('../model/userModel')


// List all
router.get('/', async (req, res) => {

    let user = await userDAO.list();
    res.json({status: true, msg: 'Usuarios cadastrados: ', user})
})


// Login
router.post('/login', async (req, res) => {

    const { usuario, senha } = req.body;
    let profCadastrado = await professorDAO.consultaLogin(usuario, senha);

    if (profCadastrado) {
        res.json({ user: profCadastrado, status: true, msg: "Login efetuado com sucesso" })
    } else {
        res.status(403).json({ status: false, msg: 'Usuario/Senha invalidos' })
    }

})

// Save
router.post('/', async (req, res) => {
    const {nome, usuario, senha} = req.body;

    userDAO
        .save(nome, usuario, senha)
        .then((user) => {
            res.json({status: true, msg: "Usuario cadastrado com sucesso", user})
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({status: false, msg: "Usuario não cadastrado", err})
        })
})

module.exports = router;