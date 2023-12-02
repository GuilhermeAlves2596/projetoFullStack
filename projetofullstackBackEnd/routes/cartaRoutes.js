var express = require('express')
var router = express.Router();
var cartaDAO = require('../model/cartaModel')
var buscaDAO = require('../model/buscaModel')
var sanitizer = require('sanitizer');
const sequelize = require('../helpers/bd');
const functions = require('../functions/validData')
const jwtToken = require('../functions/jwtToken')
const cache = require('express-redis-cache')({
    prefix: 'cardRoutes',
    host: 'localhost',
    port: 6379,
    expire: 60,
 });

 const amqp = require('amqplib'); 
 const rabbitmqConfig = {
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5672,
    username: 'guest',
    password: 'guest',
    vhost: '/',
};

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
router.get('/', jwtToken.validateToken, async (req, res) => {

    let cartas = await cartaDAO.list();
    res.json({ status: true, msg: 'Cartas cadastradss: ', cartas })
})

// Save
router.post('/', jwtToken.validateToken, functions.validData, cache.invalidate(), async (req, res) => {
    await sequelize.sync({ force: false })

    let { image, name, status, species, gender } = req.body;

    image = sanitizer.sanitize(image)
    name = sanitizer.sanitize(name)
    status = sanitizer.sanitize(status)
    species = sanitizer.sanitize(species)
    gender = sanitizer.sanitize(gender)

    try {
        await cartaDAO.save(image, name, status, species, gender);
        res.json({ status: true, msg: "Carta cadastrada com sucesso" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, msg: "Carta não cadastrada", err });
    }
});

// Get by name
router.get('/:name', jwtToken.validateToken, cache.route(), async (req, res) => {
    try {      
        const {name} = req.params
        
        name = sanitizer.sanitize(name)

        let msg;
        const result = await cartaDAO.getCardByName(name)
        if(!result){
            msg = 'Erro - Carta não encontrada: '+name;
            functions.errorCard(msg)
            res.json({status: false, msg: 'Carta não encontrada'})
        } else {
            await buscaDAO.save(result.name, 'Carta')
            res.json({status: true, msg: 'Carta encontrada', result})
        }

    } catch (error) {
        let msg = 'Erro ao buscar a carta: ' +error
        functions.errorCard(msg)
        console.error('Erro ao buscar a carta: ', error)
    }
})

// Delete
router.delete('/:id', async (req, res) => {
    try {
        let carta = await cartaDAO.delete(req.params.id)
        if(carta){
            cache.del('/');
            res.json({status: true, msg:'Carta excluida com sucesso'})
        } else {
            res.status(403).json({status: false, msg: 'Erro ao excluir a carta'})
        }
    } catch (error) {
        res.status(500).json({status: false, msg: 'Carta não encontrada'})
    }

})

module.exports = router;