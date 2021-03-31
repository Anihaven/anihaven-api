import { makeExecutableSchema } from 'graphql-tools'

// Import our schema modules
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

// Merge types and resolvers
export const schema = makeExecutableSchema({
    typeDefs: [typeDefs],
    resolvers: resolvers
})
