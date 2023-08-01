import '../index.css'

const Comment = ({ comment }) => {
    return (
        <div className='comments'>
            <p>{comment.content} - {comment.username}</p>
        </div>
    )
}

export default Comment
