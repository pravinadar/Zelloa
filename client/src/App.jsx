import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Box } from '@mui/material'

import Home from './pages/protected/Home'
import ProtectedLayout from './pages/protected/ProtectedLayout'
import Search from './pages/protected/Search'
import ProfileLayout from './pages/protected/profile/ProfileLayout'
import Zips from './pages/protected/profile/Zips'
import Replies from './pages/protected/profile/Replies'
import Repost from './pages/protected/profile/Rezips'

function App() {

  return (
    <>
      <Box minHeight={'100vh'}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProtectedLayout />} >
              <Route path='' element={<Home />} />
              <Route path='search' element={<Search />} />
              <Route path='profile' element={<ProfileLayout />}>
                <Route path='zips/:id' element={<Zips />} />
                <Route path='replies/:id' element={<Replies />} />
                <Route path='rezips/:id' element={<Repost />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Box>
    </>
  )
}

export default App
