const bcrypt = require('bcrypt');

module.exports = {
    async generatePassword(senha) {
        const saltRounds = 10;

        try {
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(senha, salt);

            return hashedPassword;
          } catch (error) {
            throw error;
          }
    }
}