import { Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    addBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className="blog-form">
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            id="title"
            type="text"
            value={title}
            label="title"
            onChange={({ target }) => setTitle(target.value)}
            variant="standard"
          />
        </div>
        <div>
          <TextField
            id="author"
            type="text"
            value={author}
            label="author"
            onChange={({ target }) => setAuthor(target.value)}
            variant="standard"
          />
        </div>
        <div>
          <TextField
            id="url"
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            label="url"
            variant="standard"
          />
        </div>
        <Button
          id="blog-create-button"
          type="submit"
          variant="contained"
          color="primary"
        >
          create
        </Button>
      </form>
    </div>
  )
}

export default BlogForm
