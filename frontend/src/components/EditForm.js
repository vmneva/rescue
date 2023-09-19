import '../index.css'
import { useState } from 'react' 
import animalService from '../services/animals'
import Notification from './Notification'

const EditForm = ({
      animal,
      setAnimals,
      animals
    }) => {
    
    const [updatedImage, setUpdatedImage] = useState(animal.image)
    const [updatedDescription, setUpdatedDescription] = useState(animal.description)
    const [updatedLocation, setUpdatedLocation] = useState(animal.location)
    const [infoMessage, setInfoMessage] = useState(null)

    const handleInputChange = (event) => {
      setUpdatedDescription(event.target.value)
    }
    const handleLocationChange = (event) => {
      setUpdatedLocation(event.target.value)
    }

    const handleImageUpload = (event) => {
        const file = event.target.files[0]
        if (file) {
          if (file.size >= 70000){
            alert('Liian suuri kuva! Lataa enintään 70KB kuva.')
          }
          if (file.type === 'image/jpeg' && file.size < 70000) {
            const reader = new FileReader()
            reader.onloadend = () => {
              setUpdatedImage(reader.result)
            }
            reader.readAsDataURL(file)
          } else if (file.type !== 'image/jpeg') {
            alert('Lataa JPG kuva.')
          }
        }
      }

    const handleUpdating = (event) => {
        event.preventDefault()
        const likedUsers = animal.users.map(user => user.id)
        updateAnimal({
            ...animal,
            image: updatedImage,
            location: updatedLocation,
            description: updatedDescription,
            users: likedUsers
        })
    }
    const updateAnimal = (animalObject) => {
      const id = animal.id
        animalService
          .update(id, animalObject)
          .then(returnedAnimal => {
            setAnimals(animals.map(animal => animal.id !== id ? animal : returnedAnimal))
          })
          .catch(error => {
            console.error('Error updating animal:', error)
          })
          setInfoMessage("Profiili päivitetty!")
          setTimeout(() => {
            setInfoMessage(null)
          }, 3000)
    }
    return (
      <div className='EditForm'>
        <Notification className="contactnotification" message={infoMessage} />
        <form onSubmit={handleUpdating}>
        <label>
          <select value={updatedLocation} onChange={handleLocationChange}>
            <option value="Helsinki">Helsinki</option>
            <option value="Oulu">Oulu</option>
          </select>
        </label>
      <br/>
      <label>
        Kuvateksti
            <textarea 
              value={updatedDescription}
              onChange={handleInputChange}
              placeholder="Pieni kuvaus eläimestä..." >
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
      <button className="editbutton" type="submit">Tallenna muutokset</button>
    </form>
        </div> 
    )
}
export default EditForm