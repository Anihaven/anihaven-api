const { Model, DataTypes } = require('sequelize')

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
    class Video extends Model {}

    Video.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        title: {
            allowNull: true,
            type: DataTypes.STRING
        },
        episode: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        season: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        description: {
            allowNull: true,
            type: DataTypes.STRING
        }
    }, { sequelize,
        tableName: 'Videos'
    })
}