import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Header from './components/common/Header'
import Home from './pages/protected/Home'
import ErrorPage from './pages/ErrorPage'

function App() {

  return (
    <>
    <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
