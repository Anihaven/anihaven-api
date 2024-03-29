const { Model, DataTypes } = require('sequelize')

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
    class Content extends Model {
        getContentURL() {
            return this.id.toString()
        }
    }

    Content.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        titleId: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING
        },
        format: {
            allowNull: false,
            type: DataTypes.ENUM({
                values: ['SERIES', 'MOVIE', 'SPECIAL', 'OVA', 'ONA']
            })
        },
        description: {
            allowNull: true,
            type: DataTypes.STRING(2000)
        },
        shortdescription: {
            allowNull: true,
            type: DataTypes.STRING
        }
    }, { sequelize,
        tableName: 'Content'
    })
}