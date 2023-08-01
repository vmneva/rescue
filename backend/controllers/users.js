const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
      .find({}).populate('animals', { name: 1, breed: 1} )
  response.json(users)
})

usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password, type } = request.body
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
    type,
  })

  const savedUser = await user.save().then(user => user.populate('animals', { name: 1, breed: 1} ))
  response.status(201).json(savedUser)
})

usersRouter.put('/:id', async (request, response) => {
  const body = request.body
  const user = {
      username: body.username,
      name: body.name,
      type: body.type || "client",
  }

  const updatedUser = await User.findByIdAndUpdate(request.params.id, user, { new: true }).populate('animals', { name: 1, breed: 1} )
  response.json(updatedUser)
})

module.exports = usersRouter