import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {Provider} from 'react-redux'
import {Counter} from '../redux-counter'
import {store} from '../redux-store'

test('can render with redux with defaults', () => {
  const {getByText, getByLabelText} = render(
    <Provider store={store}>
      <Counter />
    </Provider>,
  )

  fireEvent.click(getByText('+'))
  expect(getByLabelText(/count/i)).toHaveTextContent('1')
})
