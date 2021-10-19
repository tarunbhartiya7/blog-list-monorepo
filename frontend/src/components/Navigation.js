import { AppBar, Toolbar, Button, makeStyles } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  navlinks: {
    flexGrow: 1,
  },
}))

const Navigation = ({ loggedInUser, handleLogout }) => {
  const classes = useStyles()
  return (
    <AppBar position="static">
      <Toolbar>
        <div className={classes.navlinks}>
          <Button color="inherit" component={Link} to="/">
            blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button>
          {loggedInUser.name} logged in{' '}
        </div>
        <Button color="inherit" onClick={handleLogout}>
          logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
