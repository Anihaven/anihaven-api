const path = require('path')
import { mergeResolvers } from 'graphql-tools'
import { loadFilesSync } from 'graphql-tools'

const resolversArray = loadFilesSync(path.join(__dirname, './resolvers'))

module.exports = mergeResolvers(resolversArray)
