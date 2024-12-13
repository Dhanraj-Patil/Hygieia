const { Schema, Types } = require('mongoose')

const user = new Schema({
    firstname: String,
    middlename: String,
    lastname: String,
    dob: Date,
    gender: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    prefix: String,
    phone: String,
    country: String,
    state: String,
    languages: String,
    verified: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    updatedOn: {
        type: Date,
        default: Date.now
    },
})

module.exports = user