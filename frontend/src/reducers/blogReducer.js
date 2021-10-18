import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    case 'REMOVE_BLOG':
      return state
        .filter((item) => item.id !== action.data)
        .sort((a, b) => b.likes - a.likes)
    case 'ADD_LIKES':
      return state
        .map((blog) => (blog.id !== action.data.id ? blog : action.data))
        .sort((a, b) => b.likes - a.likes)
    default:
      return state
  }
}

export const addVote = (vote) => {
  const { id, votes, content } = vote
  const newObject = {
    content,
    id,
    votes: votes + 1,
  }

  return async (dispatch) => {
    await blogService.update(id, newObject)
    dispatch({
      type: 'VOTE',
      data: { id },
    })
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blogObject)
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog,
      })
      dispatch(
        setNotification(
          {
            message: `a new blog ${blogObject.title} by ${blogObject.author}`,
            type: 'success',
          },
          5
        )
      )
    } catch (error) {
      dispatch(
        setNotification(
          {
            message: error.response.data.error,
            type: 'error',
          },
          5
        )
      )
    }
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      let initialBlogs = await blogService.getAll()
      const sortedBlogs = initialBlogs.sort((a, b) => b.likes - a.likes)
      dispatch({
        type: 'INIT_BLOGS',
        data: sortedBlogs,
      })
    } catch (error) {
      dispatch(
        setNotification(
          {
            message: 'Error in fetching blogs',
            type: 'error',
          },
          5
        )
      )
    }
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(id)
      dispatch({
        type: 'REMOVE_BLOG',
        data: id,
      })
    } catch (error) {
      dispatch(
        setNotification(
          {
            message: 'Error in removing blog',
            type: 'error',
          },
          5
        )
      )
    }
  }
}

export const addLikes = (blogObject) => {
  return async (dispatch) => {
    const updatedBlog = { ...blogObject, likes: blogObject.likes + 1 }
    const returnedBlog = await blogService.update(updatedBlog.id, updatedBlog)
    dispatch({
      type: 'ADD_LIKES',
      data: returnedBlog,
    })
  }
}

export default blogReducer
