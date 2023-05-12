/* eslint-disable @typescript-eslint/no-explicit-any */
import { RecoilRoot, atom, useRecoilState } from 'recoil'

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
    <div className="flex flex-row px-5 justify-center">
    <textarea
        rows={8}
        cols={40}
        maxLength={1000}
        onChange={onChange}
        readOnly={ existingURL ? true : false}
        value={message}
        className="textarea textarea-bordered textarea-lg resize-none rounded-md flex-1" >
      </textarea>
    </div>
    <div className="flex flex-row px-5 justify-end">
      <p className="py-2">{message.length} / 1000</p>
    </div>
    <div className="flex flex-row px-5 justify-center">
      <button onClick={createShareableURL} className={ existingURL || !message ? 'hidden' : 'btn' }>Get Shareable URL</button>
      <button onClick={copyToClipboard} className={ existingURL ? 'btn' : 'hidden' }>Copy Content to Clipboard</button>&emsp;
      <button onClick={newMessage} className={ existingURL ? 'btn btn-outline' : 'hidden' }>New BareBin Snippet</button>
    </div>
    </>
  )
}

function Header() {
  return (
    <>
      <div className="flex flex-row justify-center">
        <h1 className="text-5xl py-2 font-bold">BareBin</h1>
      </div>
      <div className="flex flex-row justify-center">
        <p className="pb-3">A free, simple, and stateless pastebin</p>
      </div>
    </>
  )
}

function Footer() {
  return (
    <>
      <footer className="footer footer-center p-4 text-base-content">
        <div>
          <p>Copyright &copy; <a href="https://paramdeo.com" target="_blank" rel="noopener" title="Personal website of Paramdeo Singh" className="underline underline-offset-2">Paramdeo Singh</a> &middot; Made with ☕️ in 🇬🇾<br/><a href="https://github.com/paramdeo/barebin" target="_blank" rel="noopener" title="@paramdeo/barebin" className="underline underline-offset-2 py-2">@paramdeo/barebin</a></p>
        </div>
      </footer>
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
