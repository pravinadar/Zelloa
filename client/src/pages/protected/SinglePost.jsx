import { Stack, TextField } from "@mui/material"
import Post from "../../components/Home/Post"
import Comments from "../../components/Home/post/Comments"

const SinglePost = () => {
  return (
    <>
        <Stack
        flexDirection={"column"}
        gap={2}
        my={5}
        width={"90%"}
        alignSelf={"center"}
        >

            <Post/>

            <Stack
            flexDirection={"column"}
            gap={2}
            width={"100%"}
            mx={"auto"}
            >

                <Comments/>

            </Stack>

            <TextField
                variant="outlined"
                placeholder="Add a comment..."
                autoFocus
                id="comment-input"
                sx={{
                    width:"90%",
                    mx:"auto",
                    my: 5,
                    p: 1
                }}
            />
              
        </Stack>
    </>
  )
}

export default SinglePost