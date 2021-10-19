import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { initializeBlogs } from './reducers/blogReducer'
import { login, logout, setUser } from './reducers/userReducer'
import Users from './components/Users'
import userService from './services/users'
import Blogs from './components/Blogs'
import User from './components/User'
import Blog from './components/Blog'
import Navigation from './components/Navigation'

const App = () => {
  const loggedInUser = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const [users, setUsers] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  useEffect(() => {
    const getUserData = async () => {
      const result = await userService.getAll()
      setUsers(result)
    }
    getUserData()
  }, [])

  useEffect(() => {
    if (loggedInUser) dispatch(initializeBlogs())
  }, [dispatch, loggedInUser])

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleLogin = async (userObject) => {
    dispatch(login(userObject))
  }

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm handleLogin={handleLogin} />
    </Togglable>
  )

  const userMatch = useRouteMatch('/users/:id')
  const user = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null

  const blogsMatch = useRouteMatch('/blogs/:id')
  const blog = blogsMatch
    ? blogs.find((user) => user.id === blogsMatch.params.id)
    : null

  return (
    <>
      <Notification />
      {loggedInUser === null ? (
        loginForm()
      ) : (
        <>
          <Navigation handleLogout={handleLogout} loggedInUser={loggedInUser} />
          <h2>blogs</h2>
          <Switch>
            <Route path="/users/:id">
              <User user={user} />
            </Route>
            <Route path="/users">
              <Users users={users} />
            </Route>
            <Route path="/blogs/:id">
              <Blog blog={blog} />
            </Route>
            <Route path="/">
              <Blogs blogs={blogs} />
            </Route>
          </Switch>
        </>
      )}
    </>
  )
}

export default App
