const koa = require('koa')
const koaRouter = require('@koa/router')
const koaBody = require('koa-bodyparser')
const { ApolloServer } = require('apollo-server-koa') // https://www.apollographql.com/docs/apollo-server/v1/servers/koa/
const dotenv = require('dotenv')

const dev = process.env.NODE_ENV !== 'production'
if (dev) {
    dotenv.config()  // Load environment variables
}
const port = parseInt(process.env.PORT, 10) || 3080

async function createApolloServer(contentDB) {
    const { schema } = require('./graphql/schema.js')
    console.log(schema)

    const UserAPI = require('./graphql/datasources/user')
    const ContentAPI = require('./graphql/datasources/content')

    // Create the server running off of our schema
    const server = new ApolloServer({
        schema: schema,
        dataSources: () => ({
            contentAPI: new ContentAPI({ contentDB }),
            userAPI: new UserAPI({ })
        }),
        playground: dev
    })

    return server
}

async function createKoaApp() {
    // Setup router
    const router = new koaRouter()
        .all('(.*)', async (ctx, next) => {
            // await handle(ctx.req, ctx.res)
            // ctx.respond = false

            // console.log(ctx)

            await next()
        })

    // Create database
    const database = require('./database/database')
    const contentDB = await database.initialize()

    console.log(contentDB.models)

    // Apollo server
    const apolloServer = await createApolloServer(contentDB)

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
createKoaApp().then((app) => {
    // Listen to port
    app.listen(port, () => {
        console.log(`🚀 API server ready on http://localhost:${port}`)
    })
})
