const Sequelize = require('sequelize')

// --=[Get Variables]=-- //
const database_name = process.env.MYSQL_DATABASE || 'anihaven'
const database_user = process.env.MYSQL_USER || 'graphql'
const database_password = process.env.MYSQL_PASSWORD || 'password'
const host = process.env.MYSQL_HOST || 'localhost'
const port = process.env.MYSQL_PORT || '3306'

// --=[Initialize Database Connection]=-- //
const sequelize = new Sequelize(database_name, database_user, database_password, {
    host: host,
    port: port,
    dialect: 'mysql',
    define: {},
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    // <http://docs.sequelizejs.com/manual/tutorial/querying.html#operators>
    operatorsAliases: false,
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
    require('./models/content.model'),
    require('./models/country.model'),
    require('./models/license.model'),
    require('./models/staff.model'),
    require('./models/studio.model'),
    require('./models/tag.model'),
    // require('./models/user.model'),
    require('./models/video.model'),
    require('./models/video_storage.model')
]

// Load them all into the database
models.forEach(model => {
    model(sequelize)
})

// --=[Add associations]=-- //
const { Content, Country, License, Staff, Studio, Tag, Video, VideoStorage } = sequelize.models
// Content can have many tags, like Black Clover can have Shounen and Action, and Re:Zero can have Isekai and Despair or some shit lol
Content.hasMany(Tag, { foreignKey: 'content_id' })
Tag.belongsTo(Content, { foreignKey: 'content_id' })
// Content can have multiple studios, like Bones and/or Madhouse - studios can have multiple content
StudioContent = sequelize.define('studio_content', {})
Content.belongsToMany(Studio, { through: StudioContent })
Studio.belongsToMany(Content, { through: StudioContent })

// Content can have multiple licenses (different dates, different countries etc.)
LicenseStore = sequelize.define('license_store', {})
Content.belongsToMany(License, { through: LicenseStore })
// Videos can also have multiple licenses
Video.belongsToMany(License, { through: LicenseStore })
// A license can have multiple videos/content
License.belongsToMany(Video, { through: LicenseStore })
License.belongsToMany(Content,{ through: LicenseStore })
// A license can have multiple countries it's available in, and a country can have multiple licenses
LicenseCountry = sequelize.define('license_country', {})
License.belongsToMany(Country, { through: LicenseCountry })
Country.belongsToMany(License, { through: LicenseCountry })

// Studios can have multiple staff and Staff can be in multiple studios, I guess?
StudioStaff = sequelize.define('studio_staff', {})
Studio.belongsToMany(Staff, { through: StudioStaff })
Staff.belongsToMany(Studio, { through: StudioStaff })

// A video can have multiple actual video files
VideoStorage.belongsTo(Video, { foreignKey: 'video_id' })
Video.hasMany(VideoStorage, { foreignKey: 'video_id' })

// Users can have a watchlist of content
// WatchList = sequelize.define('watchlist', {})
// User.belongsToMany(Content, { through: WatchList })
// Content.belongsToMany(User, { through: WatchList })

// --=[Export database]=-- /
module.exports = sequelize