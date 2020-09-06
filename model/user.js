const mongoose = require('mongoose')

let setTime = Date.now();
var d = new Date();
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        max: 100,
        min: 2,
        required: true
    },
    avatar: {
        type: String,
        max: 100,
        min: 2,
        // required: true
    },
    userScore: {
        type: Number,
        max: 100,
        min: 0
    },
    email: {
        type: String,
        max: 100,
        min: 2,
        required: true
    },
    secretToken: {
        type: String
    },
    active: {
        type: Boolean
    },
    password: {
        type: String,
        max: 1000,
        min: 2,
        // required: true
    },
    doing: {
        type: Array,
        // default: [0,1,2]
        // required: true
    },
    date: {
        type: String,
        // default: Date.now()
        default: months[d.getMonth()] + " " +d.getFullYear()
    }
})



module.exports = mongoose.model('User', userSchema)