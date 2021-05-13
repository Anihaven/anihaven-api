const Sequelize = require('sequelize')
const mysql = require('mysql2/promise')
const {DataTypes} = require("sequelize");

// --=[Get Variables]=-- //
const database_name = process.env.MYSQL_DATABASE || 'anihaven'
const database_user = process.env.MYSQL_USER || 'graphql'
const database_password = process.env.MYSQL_PASSWORD || 'password'
const host = process.env.MYSQL_HOST || 'localhost'
const port = process.env.MYSQL_PORT || '3306'

// initialize().then(r => module.exports = r)

async function initialize() {
    // --=[Connect to Database first and check for database]=-- //
    const connection = await mysql.createConnection({ host: host, port: port, user: database_user, password: database_password })
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database_name}\`;`)

    // --=[Initialize Database Connection]=-- //
    const sequelize = new Sequelize(database_name, database_user, database_password, {
        host: host,
        port: port,
        dialect: 'mysql',
        define: {
            // We need utf8 to have Japanese characters, in titles and stuff
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: true
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        // Log query stuff
        logQueryParameters: true
    })

    // Try connection
    try {
        await sequelize.authenticate()
        console.log('Connection to database has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }

    // --=[Initialize models]=-- //
    let models = [
        require('./models/artwork.model'),
        require('./models/content.model'),
        require('./models/country.model'),
        require('./models/license.model'),
        require('./models/staff.model'),
        require('./models/storage.model'),
        require('./models/studio.model'),
        require('./models/tag.model'),
        require('./models/thumbnail.model'),
        require('./models/title.model'),
        // require('./models/user.model'),
        require('./models/video.model'),
        require('./models/video_storage.model')
    ]

    // Load them all into the database
    models.forEach(model => {
        model(sequelize)
    })

    // --=[Add associations]=-- //
    const { Artwork, Content, Country, License, Staff, Storage, Studio, Tag, Thumbnail, Title, Video, VideoStorage } = sequelize.models
    // Content can have many tags, like Black Clover can have Shounen and Action, and Re:Zero can have Isekai and Despair or some shit lol
    Content.hasMany(Tag, { foreignKey: 'ContentId' })
    Tag.belongsTo(Content, { foreignKey: 'ContentId' })
    // Title belongs to content, content belongs to title
    Content.hasOne(Title, { foreignKey: 'ContentId' })
    Title.belongsTo(Content, { foreignKey: 'ContentId' })

    // Content can have multiple studios, like Bones and/or Madhouse - studios can have multiple content
    StudioContent = sequelize.define('studio_content', {}, { tableName: 'StudioContent', timestamps: false })
    Content.belongsToMany(Studio, { through: StudioContent })
    Studio.belongsToMany(Content, { through: StudioContent })

    // Content can have multiple licenses (different dates, different countries etc.)
    LicenseContent = sequelize.define('license_content', {}, { tableName: 'LicenseContent', timestamps: false })
    Content.belongsToMany(License, { through: LicenseContent })
    // A license can have more content
    License.belongsToMany(Content,{ through: LicenseContent })
    LicenseVideo = sequelize.define('license_video', {}, { tableName: 'LicenseVideos', timestamps: false })
    // Videos can also have multiple licenses
    Video.belongsToMany(License, { through: LicenseVideo })
    // A license can have multiple videos
    License.belongsToMany(Video, { through: LicenseVideo })
    // A license can have multiple countries it's available in, and a country can have multiple licenses
    LicenseCountry = sequelize.define('license_country', {}, { tableName: 'LicenseCountries', timestamps: false })
    License.belongsToMany(Country, { through: LicenseCountry})
    Country.belongsToMany(License, { through: LicenseCountry })

    // Studios can have multiple staff and Staff can be in multiple studios, I guess?
    StudioStaff = sequelize.define('studio_staff', {}, { tableName: 'StudioStaff', timestamps: false })
    Studio.belongsToMany(Staff, { through: StudioStaff })
    Staff.belongsToMany(Studio, { through: StudioStaff })
    // Staff can have worked on a variety of content
    ContentStaff = sequelize.define('content_staff', {
        position: {
            allowNull: true,
            type: DataTypes.STRING
        }}, { tableName: 'ContentStaff', timestamps: false })
    Content.belongsToMany(Staff, { through: ContentStaff, as: {
        singular: "Staff",
        plural: "Staff"
        } })
    Staff.belongsToMany(Content, { through: ContentStaff })

    // A video can have multiple actual video files
    VideoStorage.belongsTo(Video, { foreignKey: 'VideoId' })
    Video.hasMany(VideoStorage, { foreignKey: 'VideoId' })
    // Content can have many videos
    Video.belongsTo(Content, { foreignKey: 'ContentId' })
    Content.hasMany(Video, { foreignKey: 'ContentId' })

    // Artwork
    Content.hasMany(Artwork, { foreignKey: 'ContentId' })
    Artwork.belongsTo(Content, { foreignKey: 'ContentId' })
    Video.hasOne(Thumbnail, { foreignKey: 'VideoId' })
    Thumbnail.belongsTo(Video, { foreignKey: 'VideoId' })
    // Content can have a poster and some artwork
    Content.belongsTo(Artwork, { as: 'Poster', constraints: false })
    Content.belongsTo(Artwork, { as: 'Banner', constraints: false })

    // Storage
    Storage.hasMany(VideoStorage, { foreignKey: 'StorageId' })
    VideoStorage.belongsTo(Storage, { foreignKey: 'StorageId' })
    Storage.hasMany(Artwork, { foreignKey: 'StorageId' })
    Artwork.belongsTo(Storage, { foreignKey: 'StorageId' })
    Storage.hasMany(Thumbnail, { foreignKey: 'StorageId' })
    Thumbnail.belongsTo(Storage, { foreignKey: 'StorageId' })


    // VideoStorage.hasOne(Storage)
    // Storage.hasMany(VideoStorage)
    // Artwork.hasOne(Storage)
    // Storage.hasMany(Artwork)
    // Thumbnail.hasOne(Storage)
    // Storage.hasMany(Thumbnail)

    // Users can have a watchlist of content
    // WatchList = sequelize.define('watchlist', {})
    // User.belongsToMany(Content, { through: WatchList })
    // Content.belongsToMany(User, { through: WatchList })

    // --=[Sync Everything]=-- //
    await sequelize.sync()

    // --=[Export database]=-- /
    return sequelize
}

module.exports.initialize = initialize
