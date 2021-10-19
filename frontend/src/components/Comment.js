import { Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCommentToBlog } from '../reducers/blogReducer'

const Comment = ({ blog }) => {
  const [description, setDescription] = useState('')
  const { comments } = blog
  const dispatch = useDispatch()

  const handleSubmit = () => {
    event.preventDefault()

    dispatch(addCommentToBlog(blog, description))
    setDescription('')
  }

  return (
    <>
      <h4>comments</h4>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          variant="standard"
        />
        <Button variant="contained" color="primary" type="submit">
          add comment
        </Button>
      </form>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.description}</li>
          ))}
        </ul>
      ) : (
        <p>No comments</p>
      )}
    </>
  )
}

export default Comment
