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
    file: {
        type: DataTypes.BLOB
    }
    },
    {
        sequelize,
        modelName : 'File',
        freezeTableName: true
    }
);