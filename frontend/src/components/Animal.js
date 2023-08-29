import '../index.css'
import {  useRef, useState } from 'react'
import CommentForm from './CommentForm'
import Comment from './Comment'
import Togglable from './Togglable'
import EditForm from './EditForm'
import animalService from '../services/animals'
import { ReactComponent as MaleIcon } from '../icons/male.svg'
import { ReactComponent as FemaleIcon } from '../icons/female.svg'
import { ReactComponent as HeartIcon } from '../icons/heart.svg'
import { ReactComponent as DeleteIcon } from '../icons/delete.svg'
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
    const [commentsExpanded, setCommentsExpanded] = useState(false)

    const animalRef = useRef()
    
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
                console.error('Error updating likes:', error);
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
                console.error('Error deleting like:', error);
            })
    }

    return (
    <div className='animal'>
        {user.type==="admin" && 
        <Togglable buttonLabel="Muokkaa eläinkorttia" ref={animalRef}>
            <EditForm 
                key = {animal.id}
                animal = {animal}
                setAnimals = {setAnimals}
                animals = {animals}/>
        </Togglable>
        }
        <img id="animalImg" src={animal.image} alt={`${animal.name}`}/>
        <h4>
        {(likedUsers).includes(user.id) &&
            <button onClick={handleDeleteLike} className='liked'> <HeartIcon /></button>
        }
        {!(likedUsers).includes(user.id) &&
            <button onClick={handleLike} className='like'> <HeartIcon /></button>
        }
        {animal.likes}{"   "}
        <CommentIcon className="commenticon" />{comments.length}
        </h4>
        <h3>
            {animal.name + " "} 
            {animal.sex==="male" && <MaleIcon/> }
            {animal.sex==="female" && <FemaleIcon/> }
            {" | s.  "}{animal.date_of_birth}
            {user.type==="admin" &&
            <button className="deleteAnimal" onClick={deleteAnimal}><DeleteIcon/></button> 
        } 
        </h3>
        <h4>{animal.description}</h4>
        <h5>Sijaitsen Tassulan keskuksessa {animal.location}. Aiempi kotimaani oli {animal.origin}</h5>
        <div>
            {comments.length < 3 &&
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
        }
        {comments.length >= 3 && (
            commentsExpanded ? (
            <>
            <button className="showcomments" onClick={() => setCommentsExpanded(false)}>Piilota kommentit</button>
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
            </>
        ) : (
            <button className="showcomments" onClick={() => setCommentsExpanded(true)}>Näytä kaikki {comments.length} kommenttia</button>
        )
        )}
        <CommentForm
            animal={animal}
            user={user}
            animals={animals}
            setAnimals={setAnimals}
        />
        </div>
    </div>
    )
}


export default Animal
