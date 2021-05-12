const { DataSource } = require('apollo-datasource')

class ContentAPI extends DataSource {
    constructor({ contentDB }) {
        super()
        this.store = contentDB
        // console.log(this.store)
    }

    /**
     * This is a function that gets called by ApolloServer when being setup.
     * This function gets called with the datasource config including things
     * like caches and context. We'll assign this.context to the request context
     * here, so we can know about the user making requests
     */
    initialize(config) {
        this.context = config.context
    }

    // Content
    async getContentFromId(id) {
        // console.log("get content from id")
        // console.log(id)
        const res = await this.store.models.Content.findOne({
            where: { id }
        })
        // console.log(res)
        return res
    }

    async getContent() {
        const res = await this.store.models.Content.findAll()
        return res && res.length ? res : false
    }

    // Get title
    async getTitlesFromContent(content) {
        return await content.getTitle()
    }

    // Get tags
    async getTagsFromContent(content) {
        return await content.getTags()
    }

    // Get license
    async getLicensesFromContent(content) {
        const licenses = await content.getLicenses()
        console.log(licenses)
        return licenses
    }

    async getCountriesFromLicense(license) {
        return await license.getCountries()
    }

    async getContentFromLicense(license) {
        return await license.getContent()
    }

    async getVideosFromLicense(license) {
        return await license.getVideos()
    }

    // Get videos
    async getVideosFromContent(content) {
        return await content.getVideos()
    }

    async getVideoStorageFromVideo(video) {
        return await video.getVideoStorages()
    }

    async getLicensesFromVideo(video) {
        return await video.getLicenses()
    }

    // Get staff positions on content
    async getStaffFromContent(content) {
        const staffcontent = await content.getStaff()
        // { include: [{ model: this.store.models.content_staff, as: "position" }] }
        console.log(staffcontent)
        console.log(staffcontent[0].dataValues.content_staff)
        return staffcontent
    }

    // Get studios working on content
    async getStudiosFromContent(content) {
        return await content.getStudios()
    }

    // Staff and studios

    // Get staff from a staff position
    async getStaffFromStaffPosition(staffposition) {
        return await staffposition.getStaff()
    }
}

module.exports = ContentAPI
