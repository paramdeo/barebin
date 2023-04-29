/* eslint-disable @typescript-eslint/no-explicit-any */
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

  const messageRef: string | any = useRef('')

  const queryParameters = new URLSearchParams(window.location.search)

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

  const updateBinLength = (event: any) => {
    setState(event.target.value)
  }

  useEffect(() => {
    if (existingURL) {
      setState(fromBase64(existingURL))
    }
  }, [existingURL])

  return (
    <>
      <br/>
      <h1 className="flex-start">BareBin</h1>
      <p className="flex-start">A free, simple, and stateless pastebin</p>
      <textarea
        name="message"
        rows={12}
        cols={40}
        maxLength={1000}
        ref={messageRef}
        defaultValue={state}
        onChange={updateBinLength}
        readOnly={ existingURL ? true : false} />
      <p className="flex-end">{state.length} / 1000</p>
      <button onClick={getURL} className={ existingURL ? 'hidden' : 'button' }>Get Shareable URL</button>
      <button onClick={toClipboard} className={ existingURL ? 'button' : 'hidden' }>Copy to Clipboard</button>
      <button onClick={newBin} className={ existingURL ? 'button' : 'hidden' }>New BareBin Snippet</button>
      <p className="footer">Copyright &copy; <a href="https://paramdeo.com" target="_blank" rel="noopener" title="Personal website of Paramdeo Singh">Paramdeo K. Singh</a> &middot; Made with ☕️ in 🇬🇾</p>
    </>
  )
}

export default App
