const mongoose = require('mongoose')

const connectToDb = async () => {
    await mongoose.connect('mongodb://localhost:27017/task_db')
    console.log('DB CONNECTED!!')
}

module.exports = connectToDb