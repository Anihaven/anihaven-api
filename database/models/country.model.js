const { Model, DataTypes } = require('sequelize')

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
    class Country extends Model {

    }

    Country.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        countryCode: {
            allowNull: false,
            // ISO-3166 Country Codes are 2 digits
            type: DataTypes.STRING(2)
        },
        languageCode: {
            allowNull: false,
            // ISO-639 Language Codes are 2 digits
            type: DataTypes.STRING(2)
        }
    }, { sequelize,
        tableName: 'Countries',
        timestamps: false
    })
}