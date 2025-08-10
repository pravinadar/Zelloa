import { Stack, TextField } from "@mui/material"
import Post from "../../components/Home/Post"
import Comments from "../../components/Home/post/Comments"
import { useState } from "react"
import { useSelector } from "react-redux"

const SinglePost = () => {

    const [comment, setComment] = useState("")
    const { DarkMode } = useSelector(state=>state.service);
    const fieldBg = DarkMode ? "#1e1e1e" : "#fff";
    const textPrimary = DarkMode ? "#f5f5f5" : "#000";

    return (
        <>
            <Stack
                flexDirection={"column"}
                gap={2}
                my={5}
                width={"80%"}
                alignSelf={"center"}
            >

                <Post />

                <Stack
                    flexDirection={"column"}
                    gap={2}
                    width={"100%"}
                    mx={"auto"}
                >

                    <Comments />

                </Stack>

                <TextField
                    variant="outlined"
                    placeholder="Add a comment..."
                    autoFocus
                    id="comment-input"
                    sx={{
                        width: "90%",
                        mx: "auto",
                        my: 5,
                        p: 1,
                        bgcolor: fieldBg,
                        color: textPrimary
                    }}
                    InputProps={{ sx:{ color:textPrimary } }}
                    onChange={(e) => setComment(e.target.value)}
                />

            </Stack>
        </>
    )
}

export default SinglePost