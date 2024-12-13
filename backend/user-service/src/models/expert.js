const { Schema, Types } = require('mongoose')

const expert = new Schema({
    firstname: String,
    middlename: String,
    lastname: String,
    bio: String,
    dob: Date,
    gender: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    prefix: Number,
    phone: String,
    country: String,
    state: String,
    expertType: String,
    languages: String,
    qualification: [{
        type: String
    }],
    certification: [{
        type: String
    }],
    workExp: Number,
    workHistory: [{
        name: String,
        current: Boolean,
        startDate: Date,
        endDate: Date
    }],
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

module.exports = expert