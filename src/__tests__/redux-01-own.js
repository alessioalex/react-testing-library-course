import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {Provider} from 'react-redux'
import {Counter} from '../redux-counter'
import {store as appStore} from '../redux-store'
import {createStore} from 'redux'
import {reducer} from '../redux-reducer'

test('can render with redux with defaults', () => {
  const {getByText, getByLabelText} = render(
    <Provider store={appStore}>
      <Counter />
    </Provider>,
  )

  fireEvent.click(getByText('+'))
  expect(getByLabelText(/count/i)).toHaveTextContent('1')
})

test('can render with redux with custom state', () => {
  const store = createStore(reducer, {count: 3})

  const {getByText, getByLabelText} = render(
    <Provider store={store}>
      <Counter />
    </Provider>,
  )

  fireEvent.click(getByText('-'))
  expect(getByLabelText(/count/i)).toHaveTextContent('2')
})
