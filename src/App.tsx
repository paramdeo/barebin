import { useState, useRef, useEffect } from 'react'
import './App.css'

const toBase64 = (str: string) => {
  return btoa(encodeURIComponent(str))
}

const fromBase64 = (str: string) => {
  return decodeURIComponent(atob(str))
}

function App() {
  const [state, setState] = useState('')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const messageRef: string | any = useRef('')

  const queryParameters = new URLSearchParams(window.location.search)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const existingURL: string | any = queryParameters.get("b")

  const getURL = () => {
    navigator.clipboard.writeText(window.location + '?b=' + toBase64(messageRef.current.value))
  }

  const toClipboard = () => {
    navigator.clipboard.writeText(fromBase64(existingURL))
  }

  const newBin = () => {
    setState('')
    window.location.replace(window.location.origin)
  }

  useEffect(() => {
    if (existingURL) {
      setState(fromBase64(existingURL))
    }
  }, [existingURL])

  return (
    <>
    <h1>BareBin</h1>
    <p>A free, simple, and stateless pastebin.</p>
      <textarea
        rows={15}
        cols={40}
        maxLength={1000}
        ref={messageRef}
        defaultValue={state}
        readOnly={ existingURL ? true : false} />
      <br/>
      <button onClick={() => getURL()} className={ existingURL ? 'hidden' : 'button' }>Get Shareable URL</button>
      <button onClick={() => toClipboard()} className={ existingURL ? 'button' : 'hidden' }>Copy to Clipboard</button>
      <button onClick={() => newBin()} className={ existingURL ? 'button' : 'hidden' }>New BareBin Snippet</button>
      <p className="footer">Copyright &copy; <a href="https://paramdeo.com" target="_blank" rel="noopener" title="Personal website of Paramdeo Singh">Paramdeo K. Singh</a> &middot; Made with ☕️ in 🇬🇾</p>
    </>
  )
}

export default App
