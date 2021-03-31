const { Model, DataTypes } = require('sequelize')

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
    class Tag extends Model {}

    Tag.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INT
        },
        name: {
            allowNull: false,
            type: DataTypes.ENUM({
                values: ['ACTION', 'ISEKAI', 'SHOUNEN']
            })
        }
    }, { sequelize,
        tableName: 'ContentTags'
    })
}