var express = require('express')
var router = express.Router();
var userDAO = require('../model/userModel')
var jwt = require('jsonwebtoken');
const functions = require('../functions/validData')
const sequelize = require('../helpers/bd');
const hashPassword = require('../functions/hashPassword');
const bcrypt = require('bcrypt');
const { token } = require('morgan')
const cache = require('express-redis-cache')({
    prefix: 'userRoutes',
    host: 'localhost', 
    port: 6379,
    expire: 60,
 });

 cache.invalidate = (name) => {
    return (req, res, next) => {
       const route_name = name ? name : req.url;
       if (!cache.connected) {
          next();
          return;
       }
       cache.del(route_name, (err) => {
          if (err) {
             console.error(err);
          }
          next();
       });
    };
 };

// List all
router.get('/', cache.route(), async (req, res) => {

    let user = await userDAO.list();
    res.json({ status: true, msg: 'Usuarios cadastrados: ', user })
})


// Login
router.post('/login', async (req, res) => {
    const { usuario = '', senha = '' } = req.body;
    let msg;

    if(!usuario || !senha){
        msg = 'Usuario ou senha vazios - user: ' +usuario + ' - senha: ' +senha;
        functions.validLogin(msg)
        return res.status(500).json({ status: false, msg: 'Digite o usuario e senha'});
    }

    try {
        // Consulta o usuário no banco de dados
        const usuarioCadastrado = await userDAO.consultaLogin(usuario);

        if (usuarioCadastrado) {
            // Desencripta a senha armazenada no banco de dados
            const senhaCorreta = await bcrypt.compare(senha, usuarioCadastrado.senha);

            if (senhaCorreta) {
                let token = jwt.sign({usuario: usuario}, process.env.DB_TOKEN, {
                    expiresIn: '1h'
                })
                return res.json({ user: usuarioCadastrado, token: token, status: true, msg: "Login efetuado com sucesso"});
            } else {
                msg = 'Senha incorreta: ' +senha;
                functions.validLogin(msg)
                return res.status(403).json({ status: false, msg: 'Senha incorreta' });
            }
        } else {
            msg = 'Usuario incorreto: ' +usuario;
            functions.validLogin(msg)
            return res.status(403).json({ status: false, msg: 'Usuário não encontrado' });
        }
    } catch (error) {
        let msg = 'Erro durante o login' +error;
        functions.validLogin(msg)
        console.error(error);
        return res.status(500).json({ status: false, msg: 'Erro durante o login', error });
    }
});

// Save
router.post('/', cache.invalidate(), async (req, res) => {

    const { nome, usuario, senha } = req.body;

    try {
        const hashedPassword = await hashPassword.generatePassword(senha);
        await userDAO.save(nome, usuario, hashedPassword);

        res.json({ status: true, msg: "Usuário cadastrado com sucesso" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, msg: "Usuário não cadastrado", err });
    }
});

module.exports = router;