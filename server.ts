const koa = require('koa')
const koaRouter = require('@koa/router')
const koaBody = require('koa-bodyparser')
import { ApolloServer } from 'apollo-server-koa' // https://www.apollographql.com/docs/apollo-server/v1/servers/koa/

const dev = process.env.NODE_ENV !== 'production'
if (dev) {
    require('dotenv').config()  // Load environment variables
}
const port = parseInt(process.env.PORT, 10) || 3080

export function createApolloServer() {
    // Import our GraphQL schema
    const schema = require('./graphql/schema')

    // Create the server running off of our schema
    const server = new ApolloServer(schema)

    return server
}

export function createKoaApp() {
    // Setup router
    const router = new koaRouter()
        .all('(.*)', async (ctx, next) => {
            // await handle(ctx.req, ctx.res)
            // ctx.respond = false
            console.log(ctx)

            await next()
        })

    // Apollo server
    const apolloServer = createApolloServer()

    // Setup app with all the middleware
    const app = module.exports = new koa()
        .use(koaBody()) // Body for POST
        .use(async (ctx, next) => {
            await next()

            if (!ctx.body) {
                ctx.throw(404)
            }
        })
        .use(router.routes())
        .use(router.allowedMethods())
        .use(apolloServer.getMiddleware())

    return app
}

// Create the koa application
const app = createKoaApp()

// Listen to port
app.listen(port, () => {
    console.log(`🚀 API server ready on http://localhost:${port}`)
})
