import React from 'react'
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'
import {render, fireEvent} from '@testing-library/react'
import {Main} from '../main'

function renderMain({initialEntries} = {initialEntries: ['/']}) {
  const history = createMemoryHistory({initialEntries})
  const utils = render(
    <Router history={history}>
      <Main />
    </Router>,
  )

  return {...utils}
}

test('main renders about and home and I can navigate to those pages', () => {
  const {getByRole, getByText} = renderMain()

  expect(getByRole('heading')).toHaveTextContent(/home/i)
  fireEvent.click(getByText(/about/i))
  expect(getByRole('heading')).toHaveTextContent(/about/i)
})

test('landing on a bad page shows a no match component', () => {
  const {getByRole} = renderMain({
    initialEntries: ['/something-that-does-not-match'],
  })

  expect(getByRole('heading')).toHaveTextContent(/404/i)
})
