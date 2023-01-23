const router = require('express').Router()
const { request, response } = require('express')
const { getTasksList, getTaskById, updateTask, removeTask, createTask } = require('../controllers/task')


router.get('/', async (request, response) => {
    try {
        const tasks = await getTasksList()
        response.status(200).json(tasks)
    } catch (error) {
        response.status(500)
    }
})

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const task = await getTaskById(id)
        response.status(200).json(task)
    } catch (error) {
        response.status(500)
    }
})

router.post('/', async (request, response) => {
    try {
        const data = request.body
        const task = await createTask(data)
        response.status(200).json(task)
    } catch (error) {
        response.status(500)
    }
})

router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const data = request.body
        const task = await updateTask(id, data)
        response.status(200).json(task)
    } catch (error) {
        response.status(500)
    }
})

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params
        await removeTask(id)
        response.status(200).json(true)
    } catch (error) {
        response.status(500)
    }
})

module.exports = router