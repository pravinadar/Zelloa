import { Stack } from '@mui/material'
import React from 'react'
import Comments from '../../../components/Home/post/Comments'

const Replies = () => {
  return (
    <>
      <Stack
      flexDirection={"column"}
      gap={2}
      width={"90%"}
      maxWidth={"800px"}
      mx={"auto"}
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