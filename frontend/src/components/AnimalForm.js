import '../index.css'
import { useState } from 'react' 
import animalService from '../services/animals'

const AnimalForm = ({
      animal,
      animals,
      setAnimals,
    }) => {

    const [animalData, setAnimalData] = useState({
        name: '',
        type: '',
        dateOfBirth: '',
        sex: '',
        image: '',
        breed: '',
        location: '',
        origin: '',
        })

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setAnimalData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const addAnimal = (event) => {
        event.preventDefault()
        const selectedSex = document.querySelector('#sex')
        const selectedLocation = document.querySelector('#location')
        const selectedType = document.querySelector('#type')
        const image = document.querySelector('#image')
        const sex = selectedSex.options[selectedSex.selectedIndex].value
        const location = selectedLocation.options[selectedLocation.selectedIndex].value
        const type = selectedType.options[selectedType.selectedIndex].value

        createAnimal({
            name: animalData.name,
            type: type,
            date_of_birth: animalData.date_of_birth,
            sex: sex,
            image: image,
            breed: animalData.breed,
            location: location,
            origin: animalData.origin, 
            favourite: false,
            comments: [],
        })
    }
    const createAnimal = (animalObject) => {
        animalService
            .create(animalObject)
            .then(returnedAnimal => {
                setAnimals(animals.concat(returnedAnimal))
              }) 
    }
    return (
        <div className='AnimalForm'>
          <form onSubmit={addAnimal}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={animalData.name}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Date of Birth:
        <input
          type="text"
          name="dateOfBirth"
          value={animalData.dateOfBirth}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        <select id="type">
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
        </select>
      </label>
      <label>
        <select id="sex">
            <option value="female">Female</option>
            <option value="male">Male</option>
        </select>
      </label>
      <br />
      <label>
        Image:
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
        />
      </label>
      <br />
      <label>
        Breed:
        <input
          type="text"
          name="breed"
          value={animalData.breed}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Location:
        <select id="location">
            <option value="Helsinki">Helsinki</option>
            <option value="Oulu">Oulu</option>
        </select>
      </label>
      <br />
      <label>
        Origin:
        <input
          type="text"
          name="origin"
          value={animalData.origin}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button type="submit">Add Animal</button>
    </form>
        </div> 
    )
}
export default AnimalForm