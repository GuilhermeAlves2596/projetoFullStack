var jwt = require('jsonwebtoken');
const { token } = require('morgan');

module.exports = {
  validateToken(req, res, next) {
    let token_full = req.headers["authorization"];
    if (!token_full) token_full = "";

    jwt.verify(token_full, process.env.DB_TOKEN, (err, payload) => {
      if (err) {
        res
          .status(403)
          .json({ status: false, msg: "Acesso negado - Token invalido" });
        return;
      }
      req.user = payload.user;
      next();
    });
  },

}