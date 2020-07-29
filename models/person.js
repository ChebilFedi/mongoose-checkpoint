const mongoose = require('mongoose')
let personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFoods: [
        { type: String }
    ]
})
module.exports = mongoose.model('Person', personSchema)
