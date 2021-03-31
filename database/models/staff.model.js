const { Model, DataTypes } = require('sequelize')

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
    class Staff extends Model {}

    Staff.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INT
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        }
    }, { sequelize,
        tableName: 'StudioStaff'
    })
}