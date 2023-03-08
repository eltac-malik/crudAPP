const { Router } = require('express')
const Todo = require('../models/Todo')
const router = Router()

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find()
        res.status(200).json({ todos })
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.post('/', async (req, res) => {
    try {
        if (!req.body) return res.status(400).json({ message: 'Data is not valid ' })

        const { title, completed } = req.body

        if (!title) return res.status(400).json({ message: 'Enter title' })

        const todo = await Todo.findOne({ title })

        if (todo) return res.status(400).json({ message: 'Todo with this title already exists' })

        await Todo.create({ title, completed })

        res.status(201).json({ message: 'Todo created successfully' })
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { title, completed } = req.body

        const todo = await Todo.findByIdAndUpdate(id, { $set: { title, completed } })

        if (!todo) return res.status(400).json({ message: 'Todo with this id is not exists ' })

        res.status(200).json({ message: 'Todo successfully updated' })
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const todo = await Todo.findByIdAndDelete(id)

        if (!todo) return res.status(400).json({ message: 'Todo with this id is not exists ' })

        res.status(200).json({ message: 'Todo successfully deleted' })
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})


module.exports = router