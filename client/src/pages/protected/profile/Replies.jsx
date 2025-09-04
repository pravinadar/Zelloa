import { Stack } from '@mui/material'
import React from 'react'
import Comments from '../../../components/Home/post/Comments'
import { useSelector } from 'react-redux'

const Replies = () => {
  const { DarkMode } = useSelector(state => state.service);
  return (
    <>
      <Stack
        flexDirection={"column"}
        gap={2}
        width={"90%"}
        maxWidth={"800px"}
        mx={"auto"}
        sx={{ color: DarkMode ? "#f5f5f5" : "#000" }}
      >

        <Comments />
        <Comments />
        <Comments />
        <Comments />

      </Stack>
    </>
  )
}

export default Replies