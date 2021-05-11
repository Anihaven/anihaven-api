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
        return await content.getLicenses()
    }

    // Get videos
    async getVideosFromContent(content) {
        return await content.getVideos()
    }

    async getVideoStorageFromVideo(video) {
        return await video.getVideoStorages()
    }

    // Get staff positions on content
    async getStaffFromContent(content) {
        console.log(content)
        console.log(Object.keys(content))
        console.log(content.getAssociations())
        return await content.getStaffContent()
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
