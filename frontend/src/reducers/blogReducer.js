import blogService from '../services/blogs'

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
    const newBlog = await blogService.create(blogObject)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    let initialBlogs = await blogService.getAll()
    const sortedBlogs = initialBlogs.sort((a, b) => b.likes - a.likes)
    dispatch({
      type: 'INIT_BLOGS',
      data: sortedBlogs,
    })
    // TODO: handle error case
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: id,
    })
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
