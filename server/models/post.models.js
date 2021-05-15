const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String
    },
    url: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Post', PostSchema)