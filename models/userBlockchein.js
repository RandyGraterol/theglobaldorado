const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class UserBlockchein extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id:{
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        nombre:{
          type: DataTypes.STRING,
          allowNull: false,
        },
        apellido:{
          type: DataTypes.STRING,
          allowNull: false,
        },
        fecha:{
          type: DataTypes.STRING,
          allowNull: false,
        },
        edad:{
          type: DataTypes.STRING,
          allowNull: false,
        },
         cedula:{
          type: DataTypes.STRING,
          allowNull: false,
        },
         correo:{
          type: DataTypes.STRING,
          allowNull: false,
        },
        password:{
          type: DataTypes.STRING,
          allowNull: false,
        }
      },
      {
        sequelize,
        tableName:'userBlockchein',
      }
    );
  }
}

UserBlockchein.init(sequelize,DataTypes);

// Puedes usar el modelo User para realizar operaciones con la base de datos
module.exports=UserBlockchein;