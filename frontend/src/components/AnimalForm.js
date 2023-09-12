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
        date_of_birth: '',
        sex: '',
        image: '',
        location: '',
        origin: '',
        description: '',
      })

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setAnimalData(prevData => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleImageUpload = (event) => {
        const file = event.target.files[0]
        if (file) {
          if (file.size >= 70000){
            alert('Liian suuri kuva! Lataa enintään 70KB kuva.')
          }
          console.log(file.size)
          if (file.type === 'image/jpeg' && file.size < 70000) {
            const reader = new FileReader()
            reader.onloadend = () => {
              setAnimalData((prevData) => ({
                ...prevData,
                image: reader.result, 
              }))
            }
            reader.readAsDataURL(file)
            console.log(file.size)
          } 
          else if (file.type !== 'image/jpeg') {
            alert('Lataathan JPEG kuvan.')
          }
        }
      }

    const addAnimal = (event) => {
        event.preventDefault()
        const selectedSex = document.querySelector('#sex')
        const selectedLocation = document.querySelector('#location')
        const selectedType = document.querySelector('#type')
        const description = document.querySelector('#description').value
        const sex = selectedSex.options[selectedSex.selectedIndex].value
        const location = selectedLocation.options[selectedLocation.selectedIndex].value
        const type = selectedType.options[selectedType.selectedIndex].value

        createAnimal({
            name: animalData.name,
            type: type,
            date_of_birth: animalData.date_of_birth,
            sex: sex,
            image: animalData.image,
            location: location,
            origin: animalData.origin, 
            likes: 0,
            comments: [],
            description: description
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
            date_of_birth: '',
            sex: '',
            image: '',
            location: '',
            origin: '',
            description: '',
            })
    }
    return (
      <div className='AnimalForm'>
        <div className="formContent">
          <form onSubmit={addAnimal}>
            <label>
            <select id="type">
                <option value="dog">Koira</option>
                <option value="cat">Kissa</option>
            </select>
            </label>
            <label>
              <select id="sex">
                  <option value="female">Narttu</option>
                  <option value="male">Uros</option>
              </select>
            </label>  
            <br/>    
            <label>
              Nimi
              <input
                type="text"
                name="name"
                value={animalData.name}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Arvio syntymäajasta
              <input
                type="text"
                name="date_of_birth"
                value={animalData.date_of_birth}
                onChange={handleInputChange}
                placeholder='pp.kk.vvvv'
              />
            </label>
            <br />
            <label>
              Alkuperämaa
              <input
                type="text"
                name="origin"
                value={animalData.origin}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              <select id="location">
                  <option value="Helsinki">Helsinki</option>
                  <option value="Oulu">Oulu</option>
              </select>
            </label>
            <br/>
            <label>
              Kuvateksti
                  <textarea 
                    id="description" 
                    name="description" 
                    placeholder="Pieni kuvaus eläimestä...">
                  </textarea>
                </label>
            <label>
              Kuva
              <br></br>
              <input
                type="file"
                accept=".jpg,.jpeg"
                name="image"
                onChange={handleImageUpload}
              />
            </label>
            <button type="submit">Lisää eläin</button>
          </form>
        </div>
      </div> 
    )
}
export default AnimalForm