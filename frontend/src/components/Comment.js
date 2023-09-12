import '../index.css'
import animalService from '../services/animals'

import { ReactComponent as DeleteIcon } from '../icons/delete.svg'

const Comment = ({ 
    comment,
    animal,
    animals,
    setAnimals,
    user
 }) => {

  const comments = animal.comments || []
  const commentId = comment._id 

  const handleDeleteComment = event => {
    event.preventDefault()
    const likedUsers = animal.users.map(user => user.id)
    const updatedAnimal = {
      ...animal,
      users: likedUsers,
      comments: comments.filter(deletedComment => deletedComment._id !== commentId),
    }
    deleteComment(updatedAnimal)
  }

  const deleteComment = (animalObject) => {
    const id = animal.id
    animalService
      .update(id, animalObject)
      .then(returnedAnimal => {
          setAnimals(animals.map(animal => animal.id !== id ? animal : returnedAnimal))
      })
      .catch(error => {
          console.error('Virhe kommentin poistossa:', error)
        })
  }
  
  return (
    <div>
      <li className='comment'>
        <div className="comment-content">
          <p className = "username">{comment.username}
          {(user.type === "admin" || comment.username === user.username) &&
          <button className="deleteComment" onClick={handleDeleteComment}><DeleteIcon/></button> 
          }
          </p>
          <p className='comment-text'>{comment.content} </p>
        </div>
      </li>
    </div>
  )
}

export default Comment
