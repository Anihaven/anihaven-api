import path from 'path'
import {mergeResolvers} from 'graphql-tools'
import { loadFilesSync } from 'graphql-tools'

console.log(path.resolve())

const resolversArray = loadFilesSync(path.join(path.resolve(), './graphql/resolvers'))

export default mergeResolvers(resolversArray)
