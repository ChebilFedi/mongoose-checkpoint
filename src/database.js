let mongoose = require('mongoose')
const server ='127.0.0.1:27017'
const database ='checkpointMongoose'
const Database = () => {
    mongoose.connect(`mongodb://${server}/${database}`, { useUnifiedTopology: true, useNewUrlParser: true })
        .then(() => {
            console.log('Database connection successful')
        })
        .catch(err => {
            console.error('Database connection error')
        })
}
module.exports = Database;