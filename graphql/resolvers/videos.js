module.exports = {
    // Query: {
    //     video: async (obj, args, context, info) =>
    //         db.tickets.findByPk(args.id),
    // }
    Video: {
        videostorage(video, args, context) {
            return context.dataSources.contentAPI.getVideoStorageFromVideo(video)
        }
    }
}