const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.content
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

let timeoutID

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

export const setNotification = (payload, timeInSecs) => {
  if (timeoutID) clearTimeout(timeoutID)

  return (dispatch) => {
    timeoutID = setTimeout(() => {
      dispatch(clearNotification())
    }, timeInSecs * 1000)

    dispatch({
      type: 'SET_NOTIFICATION',
      content: payload,
    })
  }
}

export default notificationReducer
