const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }]

}, {
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema)