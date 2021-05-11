module.exports = {
    Query: {
        license: () => {}
    },
    License: {
        videos(license, args, context) {
            return context.dataSources.contentAPI.getVideosFromLicense(license)
        },
        content(license, args, context) {
            return context.dataSources.contentAPI.getContentFromLicense(license)
        },
        countries: async (license, args, context) => {
            return await context.dataSources.contentAPI.getCountriesFromLicense(license)
        }
    }
}