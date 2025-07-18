import { Stack } from "@mui/material"

import Post from "../../../components/Home/Post"

const Zips = () => {
  return (
    <>
      <Stack
        flexDirection={"column"}
        gap={2}
        mb={10}
        width={"100%"}
        maxWidth={"850px"}
        mx={"auto"}
      >

        <Post/>
        <Post/>
        <Post/>
        <Post/>
        
      </Stack>
    </>
  )
}

export default Zips