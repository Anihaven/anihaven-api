const { Model, DataTypes } = require('sequelize')

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
    class Artwork extends Model {}

    Artwork.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        type: {
            allowNull: false,
            type: DataTypes.ENUM({
                values: ['POSTER', 'BANNER']
            })
        },
        format: {
            allowNull: false,
            type: DataTypes.ENUM(['png', 'jpg', 'svg', 'jpeg'])
        },
        filename: {
            allowNull: true,
            type: DataTypes.STRING
        }
    }, { sequelize,
        tableName: 'ContentArtwork'
    })
}