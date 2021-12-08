const Sequelize = require('sequelize');
const sequelize = require('../database/config/postgres')

const userModel = sequelize.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true, allowNull: false, primaryKey: true
    },
    nome: {
        type: Sequelize.STRING, allowNull: false
    },
    senha: {
        type: Sequelize.STRING, allowNull: false
    },
    email: {
        type: Sequelize.STRING, allowNull: false, unique: {
            args: true,
            msg: 'Email address already in use!'
        }
    },
    is_admin: {
        type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false
    }
},{
    scopes: {
      noPassword: {
        attributes: { exclude: ['senha'] }
      }
    }
  });

module.exports = userModel