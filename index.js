import * as dotenv from 'dotenv'
dotenv.config()
import express, { json, urlencoded } from 'express'
import Libs from './libs/index.js'
import produtosRouter from './modules/produtos/index.js'
import produtosRouterV2 from './modules/produtosV2/index.js'

console.log(process.env)

Libs.mongoConnect()

const app = express()
const port = process.env.PORT

app.use(json())
app.use(urlencoded({extended: true}))

app.use('/produtos', produtosRouter)
app.use('/v2/produtos', produtosRouterV2)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})