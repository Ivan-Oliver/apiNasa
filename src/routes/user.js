const router = require('express').Router()
const { getUserById, getUsersList, createUser, removeUser, updateUser } = require('../controllers/user')

router.get('/', async (request, response) => {
    try {
        const users = await getUsersList()
        response.status(200).json(users)
    } catch (error) {
        response.status(500)
    }
})

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const user = await getUserById(id)
        response.status(200).json(user)
    } catch (error) {
        response.status(500)
    }
})

router.post('/', async (request, response) => {
    try {
        const data = request.body
        const user = await createUser(data)
        response.status(200).json(user)
    } catch (error) {
        response.status(500).json(error)
    }
})

router.post('/toggle/datas/idNasa', async (request, response) => {
    try {
        const {idNasa} = request.params
        console.log(data)
        const user = await toggleNasaToFavorite({
            idNasa: request.user.id,
            idNasa
        })
        response.status(200).json(user)
    } catch (error) {
        response.status(500).json('Favorite creation failed')
    }
})

router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const data = request.body
        const user = await updateUser(id, data)
        response.status(200).json(user)
    } catch (error) {
        response.status(500)
    }
})

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params
        await removeUser(id)
        response.status(200).json(true)
    } catch (error) {
        response.status(500)
    }
})

module.exports = router