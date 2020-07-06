module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    whatsApp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Game, {
      foreignKey: 'userId',
    });
  };

  /*
   * Método para não retornar a senha no final da requisição
   * Function foi utilizada no lugar da Arrow Function devido ao escopo do this
   */
  User.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.password;

    return values;
  };

  return User;
};
