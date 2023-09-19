import '../index.css'
import Popup from 'reactjs-popup'
import CommentForm from './CommentForm'
import Comment from './Comment'
import EditForm from './EditForm'
import animalService from '../services/animals'
import { ReactComponent as MaleIcon } from '../icons/male.svg'
import { ReactComponent as FemaleIcon } from '../icons/female.svg'
import { ReactComponent as HeartIcon } from '../icons/heart.svg'
import { ReactComponent as CommentIcon } from '../icons/comment.svg'

const Animal = ({
      animal, 
      animals,
      deleteAnimal,
      setAnimals,
      user,
    }) => {

    const comments = animal.comments || []    
    let likes = animal.likes || 0
    const likedUsers = animal.users.map(user => user.id) || []
    
    const handleLike = (event) => {
        event.preventDefault()
        const newLikes = likes+1
        const newUser = user
        addLike({...animal, likes: newLikes, users: likedUsers.concat(newUser.id)})
    }
    const addLike = (animalObject) => {
        const id = animal.id
        animalService
            .update(id, animalObject)
            .then(returnedAnimal => {
                setAnimals(animals.map(animal => animal.id !== id ? animal : returnedAnimal))
            })
            .catch(error => {
                console.error('Virhe tykkäyksen lisäyksessä:', error);
            })
    }
    const handleDeleteLike = (event) => {
        event.preventDefault()
        const newLikes = likes-1
        const updatedUsers = likedUsers.filter(id => id !== user.id )
        deleteLike({...animal, likes: newLikes, users: updatedUsers})
    }
    const deleteLike = (animalObject) => {
        const id = animal.id
        animalService
            .update(id, animalObject)
            .then(returnedAnimal => {
                setAnimals(animals.map(animal => animal.id !== id ? animal : returnedAnimal))
            })
            .catch(error => {
                console.error('Virhe tykkäyksen poistossa:', error)
            })
    }

    return (
    <div className='animal'>
        {user.type==="admin" && 
        <div>
            <Popup trigger=
                {
                <button className='editbutton'> Muokkaa </button>
                }
                modal
                closeOnDocumentClick>
                {close => (
                <div className='editWindow'>
                    <div className="editContent">
                        <button className="close" onClick={close}>Sulje</button>
                        <EditForm 
                            key = {animal.id}
                            animal = {animal}
                            setAnimals = {setAnimals}
                            animals = {animals}/>
                        </div>
                </div>
                )}
            </Popup>
            <button className="deleteAnimal" onClick={deleteAnimal}>Poista</button> 
        </div>
        }
        <div className="location">{animal.location} </div>
        <div className='animal-image-container'>
            <img id="animalImg" src={animal.image} alt={`${animal.name}`}/>
        </div>
        <div>
            {(likedUsers).includes(user.id) &&
                <button onClick={handleDeleteLike} className='liked'> <HeartIcon /></button>}
            {!(likedUsers).includes(user.id) &&
                <button onClick={handleLike} className='like'> <HeartIcon /></button>}
            {animal.likes}
            <Popup trigger=
                {<button className='commentbutton'> <CommentIcon className="commenticon"/>{comments.length} </button>}
                modal closeOnDocumentClick>
                {close => (
                <div className='commentWindow'>
                    <div className="commentContent">
                        <button className="close" onClick={close}>X</button>
                        <ul className='comments'>
                            {comments.map(comment =>
                            <Comment
                                key={comment._id}
                                comment={comment}
                                animal={animal}
                                animals={animals}
                                setAnimals={setAnimals}
                                user={user}/>
                            )}
                        </ul>
                        <CommentForm
                            animal={animal}
                            user={user}
                            animals={animals}
                            setAnimals={setAnimals}/>
                    </div>
                </div>
                )}
            </Popup>
            <div className="birthDate">
                <p>s. {animal.date_of_birth} ({animal.origin})</p>
            </div>
            <div className='animalName'>
                <h3>
                    {animal.name + " "}
                    {animal.sex==="male" && <MaleIcon/> }
                    {animal.sex==="female" && <FemaleIcon/> }
                </h3>
            </div>
            <div className='profileInfo'>
                {animal.description}
            </div>
        </div>
        
    </div>
    )
}

export default Animal
