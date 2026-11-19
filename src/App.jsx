import React, { useState } from 'react'
import { Check, Eye, EyeOff, KeyRound, LockKeyhole, ShieldCheck, X } from 'lucide-react'

const STORED_HASH = '7230bf7d8ac334d823aa9801b650ff3be11b3ac892993fd49c4414d6e4a40c36'

async function hashPassword(value) {
  const encoded = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest('SHA-256', encoded)
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function App() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!password) return

    setStatus('checking')
    const hash = await hashPassword(password)
    setStatus(hash === STORED_HASH ? 'success' : 'denied')
  }

  const reset = () => {
    setPassword('')
    setStatus('idle')
  }

  const isSuccess = status === 'success'
  const isDenied = status === 'denied'

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Password checkpoint home">
          <span className="brand-mark"><KeyRound size={17} strokeWidth={2.5} /></span>
          <span>checkpoint<span className="brand-dot">.</span></span>
        </a>
        <div className="security-pill"><span className="status-dot" /> Local verification</div>
      </header>

      <section className="hero">
        <div className="eyebrow"><span /> PRIVATE ACCESS <span /></div>
        <h1>A quiet place for<br /><em>secure entry.</em></h1>
        <p className="hero-copy">Enter your password to verify access.<br />Your credentials never leave this browser.</p>
      </section>

      <section className="checker-card" aria-label="Password checker">
        <div className="card-heading">
          <div className="card-icon"><LockKeyhole size={21} /></div>
          <div>
            <p className="card-kicker">IDENTITY CHECK</p>
            <h2>Verify your password</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="password">Password</label>
          <div className={`input-wrap ${isDenied ? 'input-error' : ''} ${isSuccess ? 'input-success' : ''}`}>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => { setPassword(event.target.value); setStatus('idle') }}
              placeholder="Enter your password"
              autoComplete="current-password"
              autoFocus
            />
            <button type="button" className="icon-button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>

          <button className="submit-button" type="submit" disabled={!password || status === 'checking'}>
            {status === 'checking' ? 'Checking…' : 'Continue'}
            {status !== 'checking' && <span className="arrow">→</span>}
          </button>
        </form>

        {isSuccess && (
          <div className="feedback success-feedback" role="status">
            <span className="feedback-icon"><Check size={16} /></span>
            <span><strong>Connection successful</strong><small>Your identity has been verified.</small></span>
            <button className="reset-button" type="button" onClick={reset}>Reset</button>
          </div>
        )}
        {isDenied && (
          <div className="feedback denied-feedback" role="alert">
            <span className="feedback-icon"><X size={16} /></span>
            <span><strong>Connection denied</strong><small>That password doesn’t match. Please try again.</small></span>
          </div>
        )}

        <div className="card-footnote"><ShieldCheck size={15} /> SHA-256 encrypted · Checked locally</div>
      </section>

      <footer>
        <span>© 2024 checkpoint</span>
        <span className="footer-line" />
        <span>Built for privacy</span>
      </footer>
    </main>
  )
}

export default App
