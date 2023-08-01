import { useState } from 'react'
import Comment from './Comment';
import animalService from '../services/animals';

const Comments = ({ comments, animal, user }) => {
    const [newComment, setNewComment] = useState('')
    const handleInputChange = (event) => {
        setNewComment(event.target.value)
    }
    
    const handleCommentSubmit = (event) => {
        event.preventDefault();
        const commentObject = {
          content: newComment,
          username: user.username,
        };
        addComment(commentObject);
        setNewComment('');
      };
    
      const addComment = (commentObject) => {
        const id = animal.id;
        const changedAnimal = { ...animal, comments: [...comments, commentObject] };
        animalService
          .update(id, changedAnimal)
          .then(returnedAnimal => {
            // The API returns the updated animal object
            // Update the local state directly using the updated comments
            comments.push(commentObject);
          })
          .catch(error => {
            console.error('Error saving comment:', error);
          });
      };
  
    return (
      <div>
        <textarea
          value={newComment}
          onChange={handleInputChange}
          placeholder="Write a comment..."
        />
        <button onClick={handleCommentSubmit}>Submit</button>
        <h3>Comments:</h3>
        {comments.map(comment => !comment===undefined ? 
        <p>No comments yet!</p> :
        <Comment 
            key={comment.id}
            comment={comment}
        />
        )}
        
      </div>
    )
  }

  export default Comments
