const express = require('express')
const app = express()
const port = 8080

const produtosRouter = require('./modules/produtos')

app.use(express.json())

app.use('/produtos', produtosRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})