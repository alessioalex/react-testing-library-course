import React from 'react'
import user from '@testing-library/user-event'
import {render /*, fireEvent*/} from '@testing-library/react'
import {FavoriteNumber} from '../favorite-number'

test('renders a number input with a label favorite number', () => {
  const {getByLabelText} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  expect(input).toHaveAttribute('type', 'number')
})

test('entering an invalid value shows an error message', () => {
  const {getByLabelText, getByRole, queryByRole, rerender} = render(
    <FavoriteNumber />,
  )
  const input = getByLabelText(/favorite number/i)
  // fireEvent.change(input, {target: {value: '10'}})
  user.type(input, '10')
  expect(getByRole('alert')).toHaveTextContent('The number is invalid')

  rerender(<FavoriteNumber max={10} />)
  // getBy vs queryBy (1st throw an error, 2nd returns null)
  // queryBy -> to be user when verifying element is not rendered
  expect(queryByRole('alert')).toBeNull()
})
