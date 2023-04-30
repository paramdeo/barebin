/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from 'react'
import './App.css'

const toBase64 = (str: string) => {
  // String is URI encoded before being Base64 encoded to handle UTF-8
  return btoa(encodeURIComponent(str))
}

const fromBase64 = (str: string) => {
  // Base64 decoded and then URI decoded
  return decodeURIComponent(atob(str))
}

function App() {
  // Track state of message content
  const [message, setMessage] = useState('')

  // Capture snapshot of message when copying to clipboard
  const messageRef: string | any = useRef('')

  // Grab URL query parameters
  const queryParameters = new URLSearchParams(window.location.search)

  // Grab 'b?=' query parameter
  const existingURL: string | any = queryParameters.get("b")

  const createShareableURL = () => {
    // Concatenate base URL, query parameter, and Base64 encoded string
    navigator.clipboard.writeText(window.location + '?b=' + toBase64(messageRef.current.value))
  }

  const copyToClipboard = () => {
    // Copy decoded message to the clipboard
    navigator.clipboard.writeText(fromBase64(existingURL))
  }

  const newMessage = () => {
    // Reload and clear message state and URL parameter
    setMessage('')
    window.location.replace(window.location.origin)
  }

  const updateMessageLength = (event: any) => {
    // Update character length counter
    setMessage(event.target.value)
  }

  useEffect(() => {
    // Run once on page load if URL parameter is present
    if (existingURL) {
      setMessage(fromBase64(existingURL))
    }
  }, [existingURL]) // URL parameter dependency

  return (
    <>
      <br/>
      <div className="flex-start">
      <h1>BareBin</h1>
      <p>A free, simple, and stateless pastebin</p>
      </div>
      <textarea
        name="message"
        rows={12}
        cols={40}
        maxLength={1000}
        ref={messageRef}
        defaultValue={message}
        onChange={updateMessageLength}
        readOnly={ existingURL ? true : false}
      />
      <p className="flex-end">{message.length} / 1000</p>
      <button onClick={createShareableURL} className={ existingURL ? 'hidden' : 'button' }>Get Shareable URL</button>
      <button onClick={copyToClipboard} className={ existingURL ? 'button' : 'hidden' }>Copy Content to Clipboard</button>
      <button onClick={newMessage} className={ existingURL ? 'button' : 'hidden' }>New BareBin Snippet</button>
      <p className="footer">Copyright &copy; <a href="https://paramdeo.com" target="_blank" rel="noopener" title="Personal website of Paramdeo Singh">Paramdeo Singh</a> &middot; Made with ☕️ in 🇬🇾<br/><a href="https://github.com/paramdeo/barebin" target="_blank" rel="noopener" title="@paramdeo/barebin">Source on GitHub</a></p>
    </>
  )
}

export default App
