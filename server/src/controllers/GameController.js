const { Game } = require('../database/models');

const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

module.exports = {
  async index(req, res) {
    const { userId } = req;
    const { uf, city } = req.query;

    try {
      const games = await Game.findAll({ where: { uf, city } });

      // Para mostrar apenas jogos cadastrados por outras pessoas
      const filteredGames = games.filter((game) => game.userId !== userId);

      return res.ok('', filteredGames);
    } catch (error) {
      return res.serverError();
    }
  },

  async indexMine(req, res) {
    const { userId } = req;

    try {
      const games = await Game.findAll({ where: { userId } });

      return res.ok('', games);
    } catch (error) {
      return res.serverError();
    }
  },

  async show(req, res) {
    const { userId } = req;
    const { id } = req.params;

    try {
      const game = await Game.findOne({ where: { id, userId } });

      if (!game) {
        return res.notFound();
      }

      return res.ok('', game);
    } catch (error) {
      return res.serverError();
    }
  },

  async create(req, res) {
    if (req.imgTypeError) {
      return res.badRequest('Arquivo de imagem inválido!', null);
    }

    const { userId } = req;

    const image = req.file.path.slice(38);

    const { title, description, platform, city, uf } = req.body;
    const isTradeable = req.body.isTradeable ? true : false;
    const wantedGame = isTradeable ? req.body.wantedGame : null;
    const price = isTradeable ? null : req.body.price;

    try {
      const newGame = await Game.create({
        image,
        title,
        description,
        platform,
        city,
        uf,
        isTradeable,
        wantedGame,
        price,
        userId,
      });

      return res.ok('Jogo registrado com sucesso.', newGame);
    } catch (error) {
      return res.serverError();
    }
  },

  async update(req, res) {
    const { userId } = req;
    const { id } = req.params;

    const image = req.file.path.slice(38);

    const { title, description, platform, city, uf } = req.body;
    const isTradeable = req.body.isTradeable ? true : false;
    const wantedGame = isTradeable ? req.body.wantedGame : null;
    const price = isTradeable ? null : req.body.price;

    try {
      const game = await Game.findOne({ where: { id, userId } });

      if (!game) {
        return res.notFound();
      }

      unlinkAsync(game.image);

      const updatedGame = await Game.update(
        {
          image,
          title,
          description,
          platform,
          city,
          uf,
          isTradeable,
          wantedGame,
          price,
        },
        { where: { id, userId } }
      );

      return res.ok('', updatedGame);
    } catch (error) {
      return res.serverError();
    }
  },

  async delete(req, res) {
    const { userId } = req;
    const { id } = req.params;

    try {
      const game = await Game.findOne({ where: { id, userId } });

      if (!game) {
        return res.notFound();
      }

      unlinkAsync(game.image);

      await game.destroy();

      return res.ok();
    } catch (error) {
      return res.serverError();
    }
  },
};
