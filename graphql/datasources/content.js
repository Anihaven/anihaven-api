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

    async getContentFromTitleId(titleId) {
        // console.log("get content from titleId")
        // console.log(titleId)
        const res = await this.store.models.Content.findOne({
            where: { titleId }
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

    // Artwork
    async getArtworkFromContent(content) {
        return await content.getArtworks()
    }

    async getPosterFromContent(content) {
        return await content.getPoster()
    }

    async getBannerFromContent(content) {
        return await content.getBanner()
    }

    async getThumbnailFromVideo(video) {
        return await video.getThumbnail()
    }

    // Get videos
    async getVideosFromContent(content) {
        return await content.getVideos()
    }

    async getVideoFromVideoId(id) {
        console.log("getting video from id:", id)
        const res = await this.store.models.Video.findOne({
            where: { id }
        })
        return res
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

    // Storage
    async getStorageFromChild(child) {
        return await child.getStorage()
    }

    async getStorageURLFromChild(child) {
        // We need a storage to get the URL
        let storage = null
        if (child.storage) {
            storage = child.storage
        }

        if (!storage || !storage.endpoint) {
            storage = await this.getStorageFromChild(child)
        }

        // Get filename
        let filename = ""
        if (child.filename) {
            filename = child.filename
        }
        else {
            filename = child.id.toString()
        }

        // console.log(storage)
        // console.log(child)
        // console.log(child.constructor.name)
        switch (child.constructor.name) {
            case "Artwork":
            case "Thumbnail":
                return "https://"+storage.endpoint+"/artworks/"+child.type.toLowerCase()+"s/"+child.ContentId.toString()+"/"+filename+"."+child.format
            case "VideoStorage":
                const video = await child.getVideo()
                const content = await video.getContent()
                return "https://"+storage.endpoint+"/content/"+content.id.toString()+"/"+video.id.toString()+"/"+filename+"."+child.format
            default:
                return null
        }
    }
}

module.exports = ContentAPI
