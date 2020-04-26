import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {HiddenMessage} from '../hidden-message'

jest.mock('react-transition-group', () => ({
  CSSTransition: props => (props.in ? props.children : null),
}))

test('show hidden message when button is clicked', () => {
  const myMessage = 'hello world'
  const {getByText, queryByText} = render(
    <HiddenMessage>{myMessage}</HiddenMessage>,
  )
  const toggleButton = getByText(/toggle/i)
  expect(queryByText(myMessage)).not.toBeInTheDocument()
  fireEvent.click(toggleButton)
  expect(getByText(myMessage)).toBeInTheDocument()
  fireEvent.click(toggleButton)
  expect(queryByText(myMessage)).not.toBeInTheDocument()
})
