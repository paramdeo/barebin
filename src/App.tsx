/* eslint-disable @typescript-eslint/no-explicit-any */
import { RecoilRoot, atom, useRecoilState } from 'recoil';

import './App.css'

const toBase64 = (str: string) => {
  // String is URI encoded before being Base64 encoded to handle UTF-8
  return btoa(encodeURIComponent(str))
}

const fromBase64 = (str: string) => {
  // Base64 decoded and then URI decoded
  return decodeURIComponent(atob(str))
}

// Grab URL query parameters
const queryParameters = new URLSearchParams(window.location.search)

// Grab 'b?=' query parameter
const existingURL = queryParameters.get("b")

const messageState = atom({
  key: 'messageState',
  default: ''
})

function Message() {
  // Track state of message content
  const [message, setMessage] = useRecoilState(messageState)

  const createShareableURL = () => {
    // Concatenate base URL, query parameter, and Base64 encoded string
    navigator.clipboard.writeText(window.location + '?b=' + toBase64(message))
  }

  const copyToClipboard = () => {
    // Copy decoded message to the clipboard
    navigator.clipboard.writeText(message)
  }

  const newMessage = () => {
    // Clear message state and URL parameter
    setMessage('')
    window.location.replace(window.location.origin)
  }

  const onChange = (event: any) => {
    setMessage(event.target.value)
  }

  // If URL parameter is present, decode and set the message
  if (existingURL) {
    setMessage(fromBase64(existingURL))
  }

  return (
    <>
      <textarea
        rows={12}
        cols={40}
        maxLength={1000}
        onChange={onChange}
        readOnly={ existingURL ? true : false}
        value={message}
      />
      <p className="flex-end">{message.length} / 1000</p>
      <button onClick={createShareableURL} className={ existingURL ? 'hidden' : 'button' }>Get Shareable URL</button>
      <p className="flex-center">
        <button onClick={copyToClipboard} className={ existingURL ? 'button' : 'hidden' }>Copy Content to Clipboard</button>&emsp;
        <button onClick={newMessage} className={ existingURL ? 'button' : 'hidden' }>New BareBin Snippet</button>
      </p>
    </>
  )
}

function Header() {
  return (
    <>
      <br/>
      <div className="flex-start">
      <h1>BareBin</h1>
      <p>A free, simple, and stateless pastebin</p>
      </div>
    </>
  )
}

function Footer() {
  return (
    <>
      <p className="footer">Copyright &copy; <a href="https://paramdeo.com" target="_blank" rel="noopener" title="Personal website of Paramdeo Singh">Paramdeo Singh</a> &middot; Made with ☕️ in 🇬🇾<br/><a href="https://github.com/paramdeo/barebin" target="_blank" rel="noopener" title="@paramdeo/barebin">github/paramdeo/barebin</a></p>
    </>
  )
}

function App() {
  return (
    <>
    <Header/>
    <RecoilRoot>
      <Message/>
    </RecoilRoot>
    <Footer/>
    </>
  )
}

export default App
