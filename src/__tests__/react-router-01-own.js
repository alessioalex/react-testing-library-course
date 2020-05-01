import React from 'react'
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'
import {render, fireEvent} from '@testing-library/react'
import {Main} from '../main'

test('main renders about and home and I can navigate to those pages', () => {
  const history = createMemoryHistory({initialEntries: ['/']})
  const {getByRole, getByText, debug} = render(
    <Router history={history}>
      <Main />
    </Router>,
  )

  expect(getByRole('heading')).toHaveTextContent(/home/i)
  debug()
  fireEvent.click(getByText(/about/i))
  debug()
  expect(getByRole('heading')).toHaveTextContent(/about/i)
})
