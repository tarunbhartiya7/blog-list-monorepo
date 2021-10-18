import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import {
  addLikes,
  createBlog,
  initializeBlogs,
  removeBlog,
} from './reducers/blogReducer'
import { login, logout, setUser } from './reducers/userReducer'
import Users from './components/Users'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  useEffect(() => {
    if (user) dispatch(initializeBlogs())
  }, [dispatch, user])

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleLogin = async (userObject) => {
    dispatch(login(userObject))
  }

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

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm handleLogin={handleLogin} />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm addBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      <Notification />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged-in <button onClick={handleLogout}>logout</button>
          </p>
          <h2>Users</h2>
          <Users />
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
      )}
    </div>
  )
}

export default App
