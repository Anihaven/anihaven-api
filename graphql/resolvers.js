const path = require('path')
const { loadFilesSync, mergeResolvers } = require('graphql-tools')

const resolversArray = loadFilesSync(path.join(path.resolve(), './graphql/resolvers'), { extensions: ['cjs', 'js']})

console.log("resolversArray:", resolversArray)

module.exports = mergeResolvers(resolversArray)
