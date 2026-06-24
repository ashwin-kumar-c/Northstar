import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [serverMessage, setServerMessage] = useState('Checking backend...')
  const [serverTime, setServerTime] = useState('')
  const [name, setName] = useState('')
  const [greeting, setGreeting] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/message')
      .then((response) => response.json())
      .then((data) => {
        setServerMessage(data.message)
        setServerTime(new Date(data.timestamp).toLocaleString())
      })
      .catch(() => {
        setServerMessage('Backend is not reachable yet.')
      })
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/greet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      })
      const data = await response.json()
      setGreeting(data.greeting)
    } catch {
      setGreeting('Could not reach the backend. Is the server running?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-shell">
      <main className="demo-panel">
        <section className="intro">
          <p className="eyebrow">React + Express</p>
          <h1>Simple backend connection demo</h1>
          <p>
            This React screen talks to a small Express server using plain fetch
            calls. No database, no complex API layer, just a clean round trip.
          </p>
        </section>

        <section className="status-box" aria-live="polite">
          <span className="status-label">Backend says</span>
          <strong>{serverMessage}</strong>
          {serverTime && <small>Last checked: {serverTime}</small>}
        </section>

        <form className="greeting-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Send your name to Express</label>
          <div className="input-row">
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Type a name"
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </form>

        {greeting && <p className="response-message">{greeting}</p>}
      </main>
    </div>
  )
}

export default App
