module.exports = {
    Query: {
        content(content, { id, titleId }, context) {
            if (id) {
                return [context.dataSources.contentAPI.getContentFromId(id)]
            }
            else if (titleId) {
                return [context.dataSources.contentAPI.getContentFromTitleId(titleId)]
            }
            else {
                return context.dataSources.contentAPI.getContent()
            }
        }
    },
    Content: {
        title(content, args, context) {
            return context.dataSources.contentAPI.getTitlesFromContent(content)
        },
        studios(content, args, context) {
            return context.dataSources.contentAPI.getStudiosFromContent(content)
        },
        staffpositions: async (content, args, context) => {
            const rawStaffPositions = await context.dataSources.contentAPI.getStaffFromContent(content)
            const staffPositions = []
            rawStaffPositions.forEach(staffPosition => staffPositions.push({
                position: staffPosition.dataValues.content_staff.position,
                staff: staffPosition
            }))
            return staffPositions
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
        },
        artwork(content, args, context) {
            return context.dataSources.contentAPI.getArtworkFromContent(content)
        },
        poster(content, args, context) {
            return context.dataSources.contentAPI.getPosterFromContent(content)
        },
        banner(content, args, context) {
            return context.dataSources.contentAPI.getBannerFromContent(content)
        }
    }
}