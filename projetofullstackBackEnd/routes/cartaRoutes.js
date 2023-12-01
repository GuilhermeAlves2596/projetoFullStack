var express = require('express')
var router = express.Router();
var cartaDAO = require('../model/cartaModel')
const sequelize = require('../helpers/bd');
const functions = require('../functions/validData')
const jwtToken = require('../functions/jwtToken')
const cache = require('express-redis-cache')({
    prefix: 'cardRoutes',
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
router.get('/', jwtToken.validateToken, cache.route(), async (req, res) => {

    let cartas = await cartaDAO.list();
    res.json({ status: true, msg: 'Cartas cadastradss: ', cartas })
})

// Save
router.post('/', jwtToken.validateToken, functions.validData, cache.invalidate(), async (req, res) => {
    await sequelize.sync({ force: false })

    const { image, name, status, species, gender } = req.body;

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
        const result = await cartaDAO.getCardByName(name)
        if(!result){
            res.json({status: false, msg: 'Carta não encontrada'})
        } else {
            res.json({status: true, msg: 'Carta encontrada', result})
        }

    } catch (error) {
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