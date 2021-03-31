const { Model, DataTypes } = require('sequelize')

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
    class License extends Model {
        getCountries() {
            return this.countries.toString()
        }
    }

    License.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INT
        },
        from_date: {
            allowNull: true,
            type: DataTypes.DATE
        },
        to_date: {
            allowNull: true,
            type: DataTypes.DATE
        }
    }, { sequelize,
        tableName: 'Licenses'
    })
}