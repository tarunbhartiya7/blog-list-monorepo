import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { addLikes, removeBlog } from '../reducers/blogReducer'
import Comment from './Comment'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const updateLikes = async (blogObject) => {
    dispatch(addLikes(blogObject))
  }

  const deleteBlog = () => {
    const toBeDeleted = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    )
    if (toBeDeleted) {
      dispatch(removeBlog(blog.id))
      history.push('/')
    }
  }

  if (!blog) {
    return null
  }

  return (
    <>
      <h3>{blog.title}</h3>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes{' '}
        <button onClick={() => updateLikes(blog)}>like</button>
      </p>
      <p>added by {blog.user && blog.user.name}</p>
      <button onClick={deleteBlog}>remove</button>

      <Comment blog={blog} />
    </>
  )
}

export default Blog
