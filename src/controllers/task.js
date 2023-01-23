const Task = require('../models/task')

const getTasksList = async () => {
    const tasks = await Task.find()
    return tasks
}

const getTaskById = async (id) => {
    const task = await Task.findById(id)
    return task
}

const createTask = async ({ name }) => {
    const task = new Task({ name })
    return task.save()
}

const updateTask = async (id, data) => {
    const task = await getTaskById(id)
    await task.updateOne(data)

    return getTaskById(id)
}

const removeTask = async (id) => {
    await Task.findByIdAndDelete(id)

    return true
}

module.exports = {
    getTasksList,
    getTaskById,
    createTask,
    updateTask,
    removeTask
}