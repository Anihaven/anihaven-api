const path = require('path')
const { loadFilesSync, mergeTypeDefs } = require('graphql-tools')

const typesArray = loadFilesSync(path.join(path.resolve(), './graphql/types'))

// console.log("typeArray:", typesArray)

module.exports = mergeTypeDefs(typesArray)
