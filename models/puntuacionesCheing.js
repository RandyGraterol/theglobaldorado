	// peliculas.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');


class PuntuacionesCheing extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement:true,
          primaryKey:true,
        },
        email:{
          type: DataTypes.STRING,
          allowNull:false,
        },
        puntuacion: {
          type: DataTypes.INTEGER,
          allowNull:false,
        },
      },
      {
        sequelize,
        tableName: 'puntuacionesCheing',
      }
    );
  }
}

PuntuacionesCheing.init(sequelize, DataTypes);

module.exports = PuntuacionesCheing;