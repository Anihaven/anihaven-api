const { Model, DataTypes } = require('sequelize')

// The VideoStorage table in the database is used as a guide to which versions of a video is available for serving
// Like a video might have different servers it's on, and different quality versions on those servers
module.exports = (sequelize) => {
    class VideoStorage extends Model {}

    VideoStorage.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        // Path to the video on storage - not needed, as it will then just try "titleId/videoID/(filename/id).fileEnding"
        filename: {
            allowNull: true,
            type: DataTypes.STRING
        },
        resolution: {
            allowNull: false,
            type: DataTypes.ENUM(['res240', 'res360', 'res480', 'res720', 'res1080', 'res1440', 'res2160'])
        },
        format: {
            allowNull: false,
            type: DataTypes.ENUM(['mp4', 'mkv'])
        }
    }, { sequelize,
        tableName: 'VideoStorage'
    })
}