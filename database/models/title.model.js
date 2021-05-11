const { Model, DataTypes } = require('sequelize')

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
    class Title extends Model {}

    Title.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        romaji: {
            allowNull: true,
            type: DataTypes.STRING
        },
        english: {
            allowNull: true,
            type: DataTypes.STRING
        },
        native: {
            allowNull: true,
            type: DataTypes.STRING
        }
    }, { sequelize,
        tableName: 'Titles'
    })
}