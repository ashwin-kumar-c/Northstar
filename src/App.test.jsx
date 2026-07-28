import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

const jsonResponse = (data) =>
  Promise.resolve({
    json: () => Promise.resolve(data),
  })

describe('App', () => {
  test('renders the page and checks the backend on mount', async () => {
    globalThis.fetch.mockReturnValue(
      jsonResponse({
        message: 'Backend connected',
        timestamp: '2026-07-28T10:00:00.000Z',
      }),
    )

    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: /simple backend connection demo/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText('Checking backend...')).toBeInTheDocument()
    expect(globalThis.fetch).toHaveBeenCalledWith('/api/message')
    expect(await screen.findByText('Backend connected')).toBeInTheDocument()
    expect(screen.getByText(/last checked:/i)).toBeInTheDocument()
  })

  test('shows an error when the initial backend request fails', async () => {
    globalThis.fetch.mockRejectedValue(new Error('Network error'))

    render(<App />)

    expect(
      await screen.findByText('Backend is not reachable yet.'),
    ).toBeInTheDocument()
  })

  test('submits the entered name and displays the greeting', async () => {
    const user = userEvent.setup()
    globalThis.fetch
      .mockImplementationOnce(() =>
        jsonResponse({
          message: 'Backend connected',
          timestamp: '2026-07-28T10:00:00.000Z',
        }),
      )
      .mockImplementationOnce(() =>
        jsonResponse({ greeting: 'Hello, Ashwin!' }),
      )

    render(<App />)
    await screen.findByText('Backend connected')

    await user.type(
      screen.getByRole('textbox', { name: /send your name/i }),
      'Ashwin',
    )
    await user.click(screen.getByRole('button', { name: 'Send' }))

    expect(globalThis.fetch).toHaveBeenLastCalledWith('/api/greet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'Ashwin' }),
    })
    expect(await screen.findByText('Hello, Ashwin!')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send' })).toBeEnabled()
  })

  test('disables the submit button while the greeting is loading', async () => {
    const user = userEvent.setup()
    let resolveGreeting
    const greetingRequest = new Promise((resolve) => {
      resolveGreeting = resolve
    })
    globalThis.fetch
      .mockImplementationOnce(() =>
        jsonResponse({
          message: 'Backend connected',
          timestamp: '2026-07-28T10:00:00.000Z',
        }),
      )
      .mockImplementationOnce(() => greetingRequest)

    render(<App />)
    await screen.findByText('Backend connected')
    await user.type(screen.getByRole('textbox'), 'Ashwin')
    await user.click(screen.getByRole('button', { name: 'Send' }))

    expect(screen.getByRole('button', { name: 'Sending...' })).toBeDisabled()

    resolveGreeting({
      json: () => Promise.resolve({ greeting: 'Hello, Ashwin!' }),
    })

    expect(await screen.findByText('Hello, Ashwin!')).toBeInTheDocument()
  })

  test('shows an error and restores the button when greeting fails', async () => {
    const user = userEvent.setup()
    globalThis.fetch
      .mockImplementationOnce(() =>
        jsonResponse({
          message: 'Backend connected',
          timestamp: '2026-07-28T10:00:00.000Z',
        }),
      )
      .mockRejectedValueOnce(new Error('Network error'))

    render(<App />)
    await screen.findByText('Backend connected')
    await user.type(screen.getByRole('textbox'), 'Ashwin')
    await user.click(screen.getByRole('button', { name: 'Send' }))

    expect(
      await screen.findByText(
        'Could not reach the backend. Is the server running?',
      ),
    ).toBeInTheDocument()
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Send' })).toBeEnabled(),
    )
  })
})
