import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

const blog = {
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
}

describe('<Blog />', () => {
  let component
  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(<Blog blog={blog} updateLikes={mockHandler} />)
  })

  test('checks that the component displaying a blog renders title and author, but does not render its url or number of likes by default', () => {
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent(blog.likes)
  })

  test('checks that the url and number of likes are shown when the button is clicked', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    // component.debug()
    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(blog.likes)
  })

  test('checks that the url and number of likes are shown when the button is clicked', () => {
    let button = component.getByText('view')
    fireEvent.click(button)

    button = component.getByText('like')
    // console.log(prettyDOM(button))
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
