const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { blogs: 0 })
    .populate('comments')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body
  const user = request.user

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await User.findByIdAndUpdate(user._id, user)

  response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if (!blog) {
    return response.status(404).json({
      error: 'Invalid ID',
    })
  }

  if (blog.user.toString() === user._id.toString()) {
    const blog = await Blog.findByIdAndRemove(request.params.id)
    if (blog) {
      response.status(204).end()
    } else {
      response.status(404).end()
    }
  } else {
    return response.status(401).json({
      error: 'Not Authorized',
    })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const blog = {
    title,
    author,
    url,
    likes: likes || 0,
  }

  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
    .populate('user', { blogs: 0 })
    .populate('comments')
  response.json(updatedNote)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const { description } = request.body
  const blogId = request.params.id
  const blog = await Blog.findById(blogId)

  const comment = new Comment({
    description,
    blog: blogId,
  })

  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await Blog.findByIdAndUpdate(blog._id, blog)

  response.json(savedComment)
})

module.exports = blogsRouter
