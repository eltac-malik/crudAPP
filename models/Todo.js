const { Schema, model } = require('mongoose')

const todoSchema = new Schema({
    title: String,
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
}, {
    versionKey: false
})

module.exports = model('Todo', todoSchema)