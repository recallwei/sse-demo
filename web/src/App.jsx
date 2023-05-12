import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SSE } from './components'

function App() {
  return (
    <>
      <div>
        <a
          href="https://vitejs.dev"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={viteLogo}
            className="logo"
            alt="Vite logo"
          />
        </a>
        <a
          href="https://react.dev"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={reactLogo}
            className="logo react"
            alt="React logo"
          />
        </a>
        <SSE />
      </div>
    </>
  )
}

export default App
