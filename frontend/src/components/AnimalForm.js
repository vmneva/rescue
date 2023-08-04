import '../index.css'
import { useState } from 'react' 
import animalService from '../services/animals'

const AnimalForm = ({
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
        setAnimalData(prevData => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
          if (file.type === 'image/jpeg') {
            const reader = new FileReader();
            reader.onloadend = () => {
              setAnimalData((prevData) => ({
                ...prevData,
                image: reader.result, // Store the Base64 string representation in the state
              }));
            };
            reader.readAsDataURL(file);
          } else {
            alert('Please upload a JPEG image.');
          }
        }
      }

    const addAnimal = (event) => {
        event.preventDefault()
        const selectedSex = document.querySelector('#sex')
        const selectedLocation = document.querySelector('#location')
        const selectedType = document.querySelector('#type')
        const sex = selectedSex.options[selectedSex.selectedIndex].value
        const location = selectedLocation.options[selectedLocation.selectedIndex].value
        const type = selectedType.options[selectedType.selectedIndex].value

        createAnimal({
            name: animalData.name,
            type: type,
            date_of_birth: animalData.date_of_birth,
            sex: sex,
            image: animalData.image,
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
        setAnimalData({
            name: '',
            type: '',
            dateOfBirth: '',
            sex: '',
            image: '',
            breed: '',
            location: '',
            origin: '',
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
          accept=".jpg,.jpeg"
          name="image"
          onChange={handleImageUpload}
        />
      </label>
      {animalData.image && (
        <img src={animalData.image} alt="Animal Preview" style={{ width: '200px' }} />
      )}
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