const express = require('express')
const bodyParser = require('body-parser')
const tasksRoutes = require('./src/routes/task')
const usersRoutes = require('./src/routes/user')
const apiNasaRoutes = require('./src/routes/apiNasa')
const connectToDb = require('./src/services/db')

const startApp = async () => {
    const app = express()
    const port = 8000

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({
        extended: true
    }))

    app.use('/tasks', tasksRoutes)
    app.use('/users', usersRoutes)
    app.use('/sync-api', apiNasaRoutes)

    try {
        await connectToDb()
        app.listen(port, () => {
            console.log('APP running on port ' + port)
        })
    } catch (error) {
        console.log(error)
        process.exit(1)
    }

}

startApp()

