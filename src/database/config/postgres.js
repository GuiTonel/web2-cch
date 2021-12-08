const Sequelize = require('sequelize');
const sequelize = new Sequelize('db_web2', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    define: {
      "createdAt": "createdat",
      "updatedAt": "updatedat"
    }
  });

module.exports = sequelize;