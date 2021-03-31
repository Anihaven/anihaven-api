const path = require('path')
import { loadFilesSync } from 'graphql-tools'
import { mergeTypeDefs } from 'graphql-tools'

const typesArray = loadFilesSync(path.join(__dirname, './types'))

module.exports = mergeTypeDefs(typesArray)
