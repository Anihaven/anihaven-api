module.exports = {
    Query: {
        video(video, { id }, context) {
            return [context.dataSources.contentAPI.getVideoFromVideoId(id)]
        }
    },
    Video: {
        videostorage(video, args, context) {
            return context.dataSources.contentAPI.getVideoStorageFromVideo(video)
        },
        license(video, args, context) {
            return context.dataSources.contentAPI.getLicensesFromVideo(video)
        }
    },
    VideoStorage: {
        storage(videostorage, args, context) {
            return context.dataSources.contentAPI.getStorageFromChild(videostorage)
        },
        url(videostorage, args, context) {
            return context.dataSources.contentAPI.getStorageURLFromChild(videostorage)
        }
    }
}