require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

const { User } = require('../database/models');

module.exports = {
  async signUp(req, res) {
    if (req.imgTypeError) {
      return res.status(401).json({ message: 'Tipo de imagem inválida!' });
    }

    const { name, whatsApp, uf, city, email, password } = req.body;

    const imgPath = req.file.path;
    const avatar = imgPath.slice(38);

    try {
      const user = await User.findOne({ where: { email } });

      if (user) {
        // Apagar a imagem que foi enviada
        unlinkAsync(imgPath);
        return res.status(401).json({ message: 'Email já cadastrado!' });
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

  async signIn(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas!' });
      }

      const matched = await bcrypt.compare(password, user.password);

      if (!matched) {
        return res.status(401).json({ message: 'Credenciais inválidas!' });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_TOKEN_SECRET, {
        expiresIn: '1h',
      });

      const refreshToken = jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_TOKEN_SECRET,
        {
          expiresIn: '30 days',
        }
      );

      return res
        .status(200)
        .json({ message: 'Login efetuado com sucesso', token, refreshToken });
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno' });
    }
  },
};
