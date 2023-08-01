const animalsRouter = require('express').Router()
const Animal = require('../models/animal')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

animalsRouter.get('/', async (request, response) => {
    const animals = await Animal
        .find({}).populate('comments', { content: 1, username: 1} )
    response.json(animals)
})

animalsRouter.get('/:id', async (request, response) => {
    const animal = await Animal.findById(request.params.id).populate('comments', { content: 1, username: 1} )
    if (animal) {
        response.json(animal)
    } else {
        response.status(404).end()
    }
})

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }

  animalsRouter.post('/', async (request, response) => {
    const body = request.body
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const animal = new Animal({
        name: body.name,
        type: body.type,
        date_of_birth: body.date_of_birth,
        sex: body.sex,
        image: body.image,
        breed: body.breed,
        location: body.location,
        origin: body.origin, 
        favourite: body.favourite || false,
        comments: body.comments,
    })
    const savedAnimal = await animal.save()
        .then(animal => animal.populate('comments', { content: 1, username: 1} ))
    user.animals = user.animals.concat(savedAnimal._id)
    await user.save()
    response.json(savedAnimal.toJSON())
})

animalsRouter.delete('/:id', async (request, response) => {
    await Animal.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

animalsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const animal = {
        name: body.name,
        type: body.type,
        date_of_birth: body.date_of_birth,
        sex: body.sex,
        image: body.image,
        breed: body.breed,
        location: body.location,
        origin: body.origin, 
        favourite: body.favourite,
        comments: body.comments,
    }
  
    const updatedAnimal = await Animal.findByIdAndUpdate(request.params.id, animal, { new: true }).populate('comments', { content: 1, username: 1} )
    response.json(updatedAnimal)
})

module.exports = animalsRouter