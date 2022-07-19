const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: {type: String},
    content: {type: String},
    publish: {type: Boolean, default: false},
    authorId: {type: String, ref: 'users', required: true},
    categoryId: {type: String, ref: 'categories'}
}, {collection: 'posts', timestamps: true});

module.exports.Post = mongoose.model('posts', PostSchema);