const Sequelize = require('sequelize');

const sequelize = new Sequelize('globaldorado','administrador','1cyMErJUoOklr_N7', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports=sequelize;