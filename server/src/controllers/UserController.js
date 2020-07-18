const bcrypt = require('bcryptjs');

const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

const { User } = require('../database/models');
const { generateJwt, generateRefreshJwt } = require('../utils/jwt');

module.exports = {
  async signUp(req, res) {
    if (req.imgTypeError) {
      return res.badRequest('Arquivo de imagem inválido!', null);
    }

    const { name, whatsApp, uf, city, email, password } = req.body;

    const imgPath = req.file.path;
    const avatar = imgPath.slice(38);

    try {
      const user = await User.findOne({ where: { email } });

      if (user) {
        // Apagar a imagem que foi enviada
        unlinkAsync(imgPath);
        return res.badRequest('Email já cadastrado!', null);
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        avatar,
        name,
        whatsApp: `55${whatsApp}`,
        city,
        uf,
        email,
        password: hashedPassword,
      });

      return res.ok('Conta criada com sucesso!', null);
    } catch (error) {
      return res.serverError();
    }
  },

  async signIn(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.badRequest('Credenciais inválidas!', null);
      }

      const matched = await bcrypt.compare(password, user.password);

      if (!matched) {
        return res.badRequest('Credenciais inválidas!', null);
      }

      const token = generateJwt({ id: user.id });

      const refreshToken = generateRefreshJwt({ id: user.id });

      return res.ok('Login efetuado com sucesso!', user, {
        token,
        refreshToken,
      });
    } catch (error) {
      return res.serverError();
    }
  },

  async getUserInfo(req, res) {
    const { userId } = req;

    try {
      const user = await User.findOne({ where: { id: userId } });

      if (!user) {
        return res.unauthorized();
      }

      return res.ok('', { userName: user.name, userAvatar: user.avatar });
    } catch (error) {
      return res.serverError();
    }
  },
};
