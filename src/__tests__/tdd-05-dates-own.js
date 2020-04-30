import React from 'react'
import {render, fireEvent, wait} from '@testing-library/react'
import {Redirect as MockRedirect} from 'react-router'
import {savePost as mockSavePost} from '../api'
import {Editor} from '../post-editor-05-dates-own'

jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null),
  }
})

jest.mock('../api')

afterEach(() => jest.clearAllMocks())

test('renders a form with title, content, tags, and a submit button', async () => {
  // returning a promise that resolves
  mockSavePost.mockResolvedValueOnce()

  const fakeUser = {
    id: 'user-1',
  }

  const fakePost = {
    title: 'Test title',
    content: 'Test content',
    tags: ['tag1', 'tag2'],
  }
  const preDate = new Date().getTime()

  const {getByLabelText, getByText} = render(<Editor user={fakeUser} />)

  getByLabelText(/title/i).value = fakePost.title
  getByLabelText(/content/i).value = fakePost.content
  getByLabelText(/tags/i).value = fakePost.tags.join(' , ')
  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)
  expect(submitButton).toBeDisabled()

  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    authorId: fakeUser.id,
    date: expect.any(String),
  })
  expect(mockSavePost).toHaveBeenCalledTimes(1)

  const postDate = new Date().getTime()
  const date = new Date(mockSavePost.mock.calls[0][0].date).getTime()

  expect(date).toBeGreaterThanOrEqual(preDate)
  expect(date).toBeLessThanOrEqual(postDate)

  await wait(() => {
    expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {})
  })
})
