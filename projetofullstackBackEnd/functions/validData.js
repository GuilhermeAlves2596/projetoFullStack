module.exports = {
    async validData(req, res, next) {
        const { image, name, status, species, gender } = req.body

        if(!image || !name || !status || !species || !gender){
            res.status(403)
            .json({status: false, msg: "Todos os campos devem ser preenchidos."});
            return;
        }
        next();
    }
}