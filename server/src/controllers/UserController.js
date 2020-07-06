const bcrypt = require('bcryptjs');

const { User } = require('../database/models');

const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

module.exports = {
  async signUp(req, res) {
    const { name, whatsApp, uf, city, email, password } = req.body;

    const imgPath = req.file.path;
    const avatar = imgPath.slice(38);

    try {
      const user = await User.findOne({ where: { email } });

      if (user) {
        // Apagar a imagem que foi enviada
        unlinkAsync(imgPath);
        return res.status(401).json({ message: 'Usuário já cadastrado!' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        avatar,
        name,
        whatsApp,
        city,
        uf,
        email,
        password: hashedPassword,
      });

      return res
        .status(200)
        .json({ message: 'Usuário cadastrado!', user: newUser });
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno' });
    }
  },
};
