import React from 'react'
import { useSelector } from 'react-redux'
import Post from '../../../components/Home/Post'
import { Stack } from '@mui/material';

const Rezips = () => {
  const { DarkMode, user } = useSelector(state => state.service);
  return (
    <>
      <Stack
        flexDirection={"column"}
        gap={2}
        mb={10}
        width={"100%"}
        maxWidth={"850px"}
        mx={"auto"}
        sx={{ color: DarkMode ? "#f5f5f5" : "#000" }}
      >

        {
          user?.user?.rezips?.length > 0 ? (
            user?.user?.rezips?.map((rezip) => (
              <Post post={rezip} key={rezip?._id} />
            ))
          ) : (
            <p style={{ color: DarkMode ? "#f5f5f5" : "#000" }}>No rezips found.</p>
          )}
      </Stack>
    </>
  )
}

export default Rezips