import React from 'react'

const User = ({ user }) => {
  return (
    <>
      <h3>{user.name}</h3>
      <b>added blogs</b>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default User
