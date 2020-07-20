const { Game } = require('../database/models');
const { User } = require('../database/models');

const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

module.exports = {
  async index(req, res) {
    const { userId } = req;
    const { title, uf, city } = req.query;

    try {
      const games = await Game.findAll({ where: { title, uf, city } });

      if (games.length === 0) {
        return res.notFound('Nenhum resultado encontrado!');
      }

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
    const { id } = req.params;

    try {
      const game = await Game.findOne({ where: { id }, include: User });

      if (!game) {
        return res.notFound();
      }

      return res.ok('', game);
    } catch (error) {
      return res.serverError();
    }
  },

  async showMine(req, res) {
    const { userId } = req;
    const { id } = req.params;

    try {
      const game = await Game.findOne({ where: { id, userId }, include: User });

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

    const user = await User.findOne({ where: { id: userId } });

    const image = req.file.path.slice(38);

    const {
      title,
      description,
      platform,
      useMyLocalization,
      isTradeable,
    } = req.body;

    const city = useMyLocalization === 'true' ? user.city : req.body.city;
    const uf = useMyLocalization === 'true' ? user.uf : req.body.uf;
    const wantedGame = isTradeable === 'true' ? req.body.wantedGame : null;
    const price = isTradeable === 'true' ? null : req.body.price;

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

      return res.ok('Jogo registrado com sucesso!', newGame);
    } catch (error) {
      return res.serverError();
    }
  },

  async update(req, res) {
    const { userId } = req;
    const { id } = req.params;

    const user = await User.findOne({ where: { id: userId } });

    const image = req.file.path.slice(38);

    const {
      title,
      description,
      platform,
      useMyLocalization,
      isTradeable,
    } = req.body;

    const city = useMyLocalization === 'true' ? user.city : req.body.city;
    const uf = useMyLocalization === 'true' ? user.uf : req.body.uf;
    const wantedGame = isTradeable === 'true' ? req.body.wantedGame : null;
    const price = isTradeable === 'true' ? null : req.body.price;

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

      return res.ok('Anúncio editado com sucesso!', updatedGame);
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

      return res.ok('Anúncio excluído com sucesso!');
    } catch (error) {
      return res.serverError();
    }
  },
};
