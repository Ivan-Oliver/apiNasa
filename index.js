const express = require('express');
const bodyParser = require('body-parser');
const router = require('./src/routes/user');
const routerNasa = require('./src/routes/apiNasa');
const routerAuth = require('./src/routes/auth');
const {controlAuthentication} = require('./src/middelware/auth')
const connectToDb = require('./src/services/db');
const dotenv = require('dotenv');
const { Router } = require('express');

dotenv.config()

const startApp = async () => {
    const app = express();
    const port = 8000;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }))

    app.use(controlAuthentication)
    app.use('/users', router)
    app.use('/syncApiNasa', routerNasa)
    app.use('/auth', routerAuth)

    try {
        await connectToDb()
        app.listen(port, () => {
            console.log('NASA APP running on port ' + port)
        })
    } catch (error) {
        process.exit(1)
    }
}

startApp()