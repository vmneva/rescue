const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const mongoUrl =
  `mongodb+srv://vmneva:${password}@cluster0.4vkn6q3.mongodb.net/rescueApp?retryWrites=true&w=majority`

mongoose.connect(mongoUrl)

const animalSchema = new mongoose.Schema({
  name: String,
  type: String, 
  date_of_birth: String,
  sex: String, 
  image: String,
  breed: String,
  location: String,
  origin: String, 
})

const Animal = mongoose.model('Animal', animalSchema)

const animal = new Animal({
  name: "Musti",
  type: "dog", 
  date_of_birth: "19.07.2020",
  sex: "male", 
  image: "https://www.pexels.com/photo/short-haired-brown-dog-3113766/",
  breed: "amstaff",
  location: "Helsinki",
  origin: "Russia"
})

animal.save().then(result => {
  console.log('animal saved!')
  mongoose.connection.close()
})