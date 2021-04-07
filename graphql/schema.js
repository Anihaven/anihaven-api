import { makeExecutableSchema } from 'graphql-tools'

// Import our schema modules
import typeDefs from './typeDefs.js'
import resolvers from './resolvers.js'

// Merge types and resolvers
export const schema = makeExecutableSchema({
    typeDefs: [typeDefs],
    resolvers: resolvers
})
