import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification) {
    return null
  }

  if (notification.type === 'success') {
    return <div className="success">{notification.message}</div>
  }

  if (notification.type === 'error') {
    return <div className="error">{notification.message}</div>
  }
}

export default Notification
