const { makeExecutableSchema } = require('graphql-tools')

// Import our schema modules
const typeDefs = require('./typeDefs.js')
const resolvers = require('./resolvers.js')

console.log("resolvers:", resolvers)
// console.log("typeDefs:", typeDefs)

// Merge types and resolvers
const schema = makeExecutableSchema({
    typeDefs: [typeDefs],
    resolvers: resolvers
})

module.exports = {schema}
