import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addLikes, createBlog, removeBlog } from '../reducers/blogReducer'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import Blog from './Blog'

const Blogs = () => {
  const blogFormRef = useRef()
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  const addBlog = async (blogObject) => {
    try {
      await dispatch(createBlog(blogObject))
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      console.log(console.error())
    }
  }

  const updateLikes = async (blogObject) => {
    dispatch(addLikes(blogObject))
  }

  const deleteBlog = (id) => {
    dispatch(removeBlog(id))
  }

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm addBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      {blogForm()}
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateLikes={updateLikes}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  )
}

export default Blogs
