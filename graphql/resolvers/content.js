module.exports = {
    Query: {
        getContentByID(content, { id }, context) {
            return context.dataSources.contentAPI.getContentFromId(id)
        },
        getAllContent(_, __, context) {
            return ([
                {
                    id: 1
                },
                {
                    id: 2
                },
                {
                    id: 3
                }
            ])
        }
    },
    Content: {
        title(content, args, context) {
            return context.dataSources.contentAPI.getTitlesFromContent(content)
        },
        studios(content, args, context) {
            return context.dataSources.contentAPI.getStudiosFromContent(content)
        },
        staff(content, args, context) {
            return context.dataSources.contentAPI.getStaffFromContent(content)
        },
        tags: async (content, args, context) => {
            const rawTags = await context.dataSources.contentAPI.getTagsFromContent(content)
            const tags = []
            rawTags.forEach(tag => tags.push(tag.dataValues.name))
            return tags
        },
        videos(content, args, context) {
            return context.dataSources.contentAPI.getVideosFromContent(content)
        },
        license(content, args, context) {
            return context.dataSources.contentAPI.getLicensesFromContent(content)
        }
    }
}