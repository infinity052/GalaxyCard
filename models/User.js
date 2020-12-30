const {DataTypes, Model} = require("sequelize");
const sequelize = require('../database/connection');

class User extends Model{}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    
    {
        sequelize,
        modelName : 'User',
        freezeTableName: true
    }
);

module.exports = User;