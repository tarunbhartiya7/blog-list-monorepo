import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'

import { createBlog } from '../reducers/blogReducer'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { Link } from 'react-router-dom'

const Blogs = ({ blogs }) => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const addBlog = async (blogObject) => {
    try {
      await dispatch(createBlog(blogObject))
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      console.log(console.error())
    }
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
        <div key={blog.id} className="blogStyle">
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  )
}

export default Blogs
