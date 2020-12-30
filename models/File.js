const {DataTypes, Model} = require("sequelize");
const sequelize = require('../database/connection');

class File extends Model{}

File.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },

    filename: {
        type : DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    originalname: {
        type : DataTypes.STRING,
        allowNull: false
    }
    },
    {
        sequelize,
        modelName : 'File',
        freezeTableName: true
    }
);

module.exports = File;