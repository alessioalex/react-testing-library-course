import React from 'react'
import {render, fireEvent, wait} from '@testing-library/react'
import {build, fake, sequence} from 'test-data-bot'
import {Redirect as MockRedirect} from 'react-router'
import {savePost as mockSavePost} from '../api'
import {Editor} from '../post-editor-08-custom-render-own'

jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null),
  }
})

jest.mock('../api')

afterEach(() => jest.clearAllMocks())

const postBuilder = build('Post').fields({
  title: fake(f => f.lorem.words()),
  content: fake(f => f.lorem.paragraphs().replace(/\r/g, '')),
  tags: fake(f => [f.lorem.words(), f.lorem.words(), f.lorem.words()]),
})

const userBuilder = build('User').fields({
  id: sequence(s => `user-${s}`),
})

function renderEditor() {
  const fakeUser = userBuilder()
  const fakePost = postBuilder()

  const utils = render(<Editor user={fakeUser} />)

  utils.getByLabelText(/title/i).value = fakePost.title
  utils.getByLabelText(/content/i).value = fakePost.content
  utils.getByLabelText(/tags/i).value = fakePost.tags.join(' , ')
  const submitButton = utils.getByText(/submit/i)

  return {
    ...utils,
    fakeUser,
    fakePost,
    submitButton,
  }
}

test('renders a form with title, content, tags, and a submit button', async () => {
  // returning a promise that resolves
  mockSavePost.mockResolvedValueOnce()
  const preDate = new Date().getTime()

  const {fakeUser, fakePost, submitButton} = renderEditor()

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

test('renders an error message from the server', async () => {
  const testError = 'test error'
  mockSavePost.mockRejectedValueOnce({data: {error: testError}})

  const {submitButton, findByRole} = renderEditor()

  fireEvent.click(submitButton)

  const postError = await findByRole('alert')
  expect(postError).toHaveTextContent(testError)
  expect(submitButton).not.toBeDisabled()
})
