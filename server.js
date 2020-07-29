const express = require('express')
const app = express()
const database = require('./src/database')
database()

app.use(express.json())

const personRoutes = require('./routers/routes')
app.use('/', personRoutes)
app.listen(4000, () => {
    console.log('server running on port 400.')
})