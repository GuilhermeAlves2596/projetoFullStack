var express = require('express')
var router = express.Router();
var cartaDAO = require('../model/cartaModel')
const sequelize = require('../helpers/bd');
const functions = require('../functions/validData')


// List all
router.get('/', async (req, res) => {

    let cartas = await cartaDAO.list();
    res.json({ status: true, msg: 'Cartas cadastradss: ', cartas })
})

// Save
router.post('/', functions.validData, async (req, res) => {

    await sequelize.sync({ force: false })

    const { image, name, status, species, gender } = req.body;

    try {

        await cartaDAO.save(image, name, status, species, gender);



        res.json({ status: true, msg: "Carta cadastrada com sucesso" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, msg: "Carta não cadastrada", err });
    }

})

// Delete
router.delete('/:id', async (req, res) => {
    try {
        let carta = await cartaDAO.delete(req.params.id)
        if(carta){
            res.json({status: true, msg:'Carta excluida com sucesso'})
        } else {
            res.status(403).json({status: false, msg: 'Erro ao excluir a carta'})
        }
    } catch (error) {
        res.status(500).json({status: false, msg: 'Carta não encontrada'})
    }

})

module.exports = router;