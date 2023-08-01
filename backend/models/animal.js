const mongoose = require('mongoose')

const animalSchema = new mongoose.Schema({
  name: String,
  type: String, //dog/cat
  date_of_birth: String,
  sex: String, //female/male
  image: String,
  breed: String,
  location: String,
  origin: String, //from which country
  favourite: Boolean,
  comments: [{
      content: String,
      username: String
    }
  ],
})

animalSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  module.exports = mongoose.model('Animal', animalSchema)