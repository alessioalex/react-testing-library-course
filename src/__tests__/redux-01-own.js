import React from 'react'
import {render as rtlRender, fireEvent} from '@testing-library/react'
import {Provider} from 'react-redux'
import {Counter} from '../redux-counter'
import {createStore} from 'redux'
import {reducer} from '../redux-reducer'

function render(
  ui,
  {
    initialState,
    store = createStore(reducer, initialState),
    ...rtlOptions
  } = {},
) {
  const Wrapper = ({children}) => {
    return <Provider store={store}>{children}</Provider>
  }
  return {
    ...rtlRender(ui, {wrapper: Wrapper, ...rtlOptions}),
    store,
  }
}

test('can render with redux with defaults', () => {
  const {getByText, getByLabelText} = render(<Counter />)

  fireEvent.click(getByText('+'))
  expect(getByLabelText(/count/i)).toHaveTextContent('1')
})

test('can render with redux with custom state', () => {
  const {getByText, getByLabelText} = render(<Counter />, {
    initialState: {count: 3},
  })

  fireEvent.click(getByText('-'))
  expect(getByLabelText(/count/i)).toHaveTextContent('2')
})
