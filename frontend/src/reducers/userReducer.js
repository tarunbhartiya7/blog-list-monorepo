import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const logout = () => {
  window.localStorage.removeItem('loggedBlogAppUser')
  return {
    type: 'LOGOUT',
  }
}

export const setUser = (user) => {
  blogService.setToken(user.token)
  return {
    type: 'SET_USER',
    data: user,
  }
}

export const login = (userObject) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(userObject)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      dispatch({
        type: 'SET_USER',
        data: user,
      })
    } catch (error) {
      dispatch(
        setNotification(
          {
            message: 'Wrong credentials',
            type: 'error',
          },
          5
        )
      )
    }
  }
}

export default userReducer
