import path from 'path'
import { loadFilesSync, mergeTypeDefs } from 'graphql-tools'

const typesArray = loadFilesSync(path.join(path.resolve(), './graphql/types'))

export default mergeTypeDefs(typesArray)
