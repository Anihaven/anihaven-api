const koa = require('koa')
const koaRouter = require('@koa/router')
const koaBody = require('koa-bodyparser')
const { ApolloServer } = require('apollo-server-koa') // https://www.apollographql.com/docs/apollo-server/v1/servers/koa/
const dotenv = require('dotenv')
const { schema } = require('./graphql/schema.js')

const dev = process.env.NODE_ENV !== 'production'
if (dev) {
    dotenv.config()  // Load environment variables
}
const port = parseInt(process.env.PORT, 10) || 3080

const UserAPI = require('./graphql/datasources/user')
const ContentAPI = require('./graphql/datasources/content')

function createApolloServer() {
    // Import our GraphQL schema
    console.log(schema)

    // Create the server running off of our schema
    const server = new ApolloServer({
        schema: schema,
        dataSources: () => ({
            contentAPI: new ContentAPI(),
            userAPI: new UserAPI()
        }),
        playground: dev
    })

    return server
}

function createKoaApp() {
    // Setup router
    const router = new koaRouter()
        .all('(.*)', async (ctx, next) => {
            // await handle(ctx.req, ctx.res)
            // ctx.respond = false

            // console.log(ctx)

            await next()
        })

    // Apollo server
    const apolloServer = createApolloServer()

    // Setup app with all the middleware
    const app = new koa()
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
