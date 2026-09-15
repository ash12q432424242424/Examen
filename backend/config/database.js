const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mssql',
  dialectModulePath: 'msnodesqlv8/lib/sequelize',
  database: 'ExamenWeb2',
  server: 'PCLAB109',
  dialectOptions: {
    options: {
      trustedConnection: true,
      useUTC: false
    }
  },
  logging: false
});

module.exports = sequelize;