module.exports = {
    Query: {
        getContentByID(content, { id }, context) {
            return ({
                id: 1
            })
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
            console.log(content)
            if (content.id === 1) {
                return ({
                    romaji: "Howl's moving castle",
                    english: "Howl's moving castle",
                    native: "Howl's moving castle"
                })
            }
            else {
                return ({
                    romaji: "fuck",
                    english: "frick",
                    native: "fucku"
                })
            }
        },
        format(content, args, context) {
            return ('MOVIE')
        },
        studios(content, args, context) {
            return ([{
                id: 1,
                name: "Ghibli"
            }])
        },
        staff(content, args, context) {
            return ([{
                position: "CREATOR",
                staff: {
                    id: 1,
                    name: "Hero"
                }
            }])
        },
        tags(content, args, context) {
            return (["ISEKAI", "ACTION"])
        },
        videos(content, args, context) {
            return ([{
                id: 1,
                name: "Howl's Moving Castle Movie",
                videostorage: [{
                    id: 1,
                    path: "mmh/mmmh/nice/",
                    resolution: "res720",
                    format: "mp4"
                }]
            }])
        },
        license(content, args, context) {
            return null
        }
    }
}