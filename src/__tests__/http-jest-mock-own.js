import React from 'react'
import {render, fireEvent, wait} from '@testing-library/react'
import {GreetingLoader} from '../greeting-loader-02-dependency-injection'

test('loads readings on click', async () => {
  const testGreeting = 'TEST_GREETING'
  const testName = 'Mary'
  const mockLoadGreeting = jest.fn()
  mockLoadGreeting.mockResolvedValueOnce({data: {greeting: testGreeting}})
  const {getByLabelText, getByText} = render(
    <GreetingLoader loadGreeting={mockLoadGreeting} />,
  )
  const nameInput = getByLabelText(/name/i)
  const loadButton = getByText(/load/i)

  nameInput.value = testName
  fireEvent.click(loadButton)
  expect(mockLoadGreeting).toHaveBeenCalledWith(testName)
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)
  await wait(() =>
    expect(getByLabelText(/greeting/i)).toHaveTextContent(testGreeting),
  )
})
