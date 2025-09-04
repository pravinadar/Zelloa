import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'

import Home from './pages/protected/Home'
import ProtectedLayout from './pages/protected/ProtectedLayout'
import Search from './pages/protected/Search'
import ProfileLayout from './pages/protected/profile/ProfileLayout'
import Zips from './pages/protected/profile/Zips'
import Replies from './pages/protected/profile/Replies'
import Repost from './pages/protected/profile/Rezips'
import SinglePost from './pages/protected/SinglePost'
import Register from './pages/Register'
import ErrorPage from './pages/ErrorPage'
import { useMyInfoQuery } from './redux/serviceAPI'

function App() {
  const { DarkMode, myInfo } = useSelector(state=>state.service);
  const bg = DarkMode ? "#121212" : "#ffffff";
  const textPrimary = DarkMode ? "#f5f5f5" : "#000";
  const { data, isError, isLoading } = useMyInfoQuery();

  // If we're loading, show a loading state
  if (isLoading) {
    return (
      <Box 
        minHeight={'100vh'} 
        sx={{ 
          bgcolor: bg, 
          color: textPrimary, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
      >
        Loading...
      </Box>
    );
  }

  // If there's an error, no data, or myInfo is explicitly null, show register page
  if (isError || !data || myInfo === null) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Register />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <>
      <Box minHeight={'100vh'} sx={{ bgcolor:bg, color:textPrimary, transition:"background-color .25s,color .25s" }}>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<ProtectedLayout />} >
              <Route path='' element={<Home />} />
              <Route path='search' element={<Search />} />
              <Route path='post/:id' element={<SinglePost />} />

              <Route path='profile' element={<ProfileLayout />}>
                <Route path='zips/:id' element={<Zips />} />
                <Route path='replies/:id' element={<Replies />} />
                <Route path='rezips/:id' element={<Repost />} />
              </Route>

              </Route>

            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </>
  )
}

export default App
