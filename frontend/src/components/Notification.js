import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification) {
    return null
  }

  if (notification.type === 'success') {
    return <Alert severity="success">{notification.message}</Alert>
  }

  if (notification.type === 'error') {
    return <Alert severity="error">{notification.message}</Alert>
  }
}

export default Notification
