module.exports = {
    Query: {
        getArtwork: () => {},
        getThumbnail: () => {}
    },
    Artwork: {
        storage(artwork, args, context) {
            return context.dataSources.contentAPI.getStorageFromChild(artwork)
        },
        url(artwork, args, context) {
            return context.dataSources.contentAPI.getStorageURLFromChild(artwork)
        }
    },
    Thumbnail: {
        storage(thumbnail, args, context) {
            return context.dataSources.contentAPI.getStorageFromChild(thumbnail)
        },
        url(thumbnail, args, context) {
            return context.dataSources.contentAPI.getStorageURLFromChild(thumbnail)
        }
    }
}