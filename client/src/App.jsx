import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Box } from '@mui/material'

import Home from './pages/protected/Home'
import ProtectedLayout from './pages/protected/ProtectedLayout'

function App() {

  return (
    <>
      <Box minHeight={'100vh'}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProtectedLayout />} >
              <Route path='' element={<Home />} />
              <Route path='post/:id' element={<p>Dynamic Post Content</p>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Box>
    </>
  )
}

export default App
