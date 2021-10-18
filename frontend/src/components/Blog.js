import React, { useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const handleRemove = () => {
    const toBeDeleted = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    )
    if (toBeDeleted) deleteBlog(blog.id)
  }

  return (
    <div className="blogStyle">
      {blog.title} {blog.author}{' '}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'hide' : 'view'}
      </button>
      {showDetails && (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{' '}
            <button onClick={() => updateLikes(blog)}>like</button>
          </div>
          <div>{blog.user && blog.user.name}</div>
          <button onClick={handleRemove}>remove</button>
        </>
      )}
    </div>
  )
}

export default Blog
