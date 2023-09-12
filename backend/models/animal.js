const mongoose = require('mongoose')

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date_of_birth: String,
  sex: String, 
  image: {
    type: String,
    required: true,
  },
  location: String,
  origin: String, 
  likes: Number,
  comments: [{
      content: String,
      username: String
    }
  ],
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  description: String
})

animalSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      if (returnedObject._id) {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
      }
      delete returnedObject.__v
    }
  })
  
  module.exports = mongoose.model('Animal', animalSchema)