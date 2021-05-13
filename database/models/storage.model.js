const { Model, DataTypes } = require('sequelize')

// The VideoStorage table in the database is used as a guide to which versions of a video is available for serving
// Like a video might have different servers it's on, and different quality versions on those servers
module.exports = (sequelize) => {
    class Storage extends Model {}

    Storage.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        // What is the name of the storage container
        name: {
            allowNull: true,
            type: DataTypes.STRING
        },
        isS3: {
            allowNull: false,
            defaultValue: true,
            type: DataTypes.BOOLEAN
        },
        endpoint: {
            allowNull: false,
            type: DataTypes.STRING
        }
    }, { sequelize,
        tableName: 'Storage'
    })
}