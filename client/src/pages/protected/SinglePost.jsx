import { Button, Stack, TextField } from "@mui/material"
import Post from "../../components/Home/Post"
import Comments from "../../components/Home/post/Comments"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useAddCommentMutation, useSinglePostQuery } from "../../redux/serviceAPI"

const SinglePost = () => {

    const [comment, setComment] = useState("")
    const { DarkMode } = useSelector(state => state.service);
    const fieldBg = DarkMode ? "#1e1e1e" : "#fff";
    const textPrimary = DarkMode ? "#f5f5f5" : "#000";

    const params = useParams();

    const { data, refetch } = useSinglePostQuery(params.id);
    // console.log(data);
    const [addComment, addCommentData] = useAddCommentMutation();
    // console.log(addCommentData);

    const handleAddComment = async (e) => {
        if (data && e.key === "Enter") {
            if (comment) {
                console.log(comment)
                await addComment({ id: params.id, text: comment });
                setComment("");
            }
        }
    }

    const handleAddCommentClick = async () => {
        if (data) {
            if (comment) {
                console.log(comment)
                await addComment({ id: params.id, text: comment });
                setComment("");
            }
        }
    }

    useEffect(() => {
        if (addCommentData.isSuccess) {
            console.log(addCommentData.data);
            refetch();
        }
        if (addCommentData.isError) {
            console.log(addCommentData.error?.data);
        }
    }, [addCommentData.isSuccess, addCommentData.isError])

    return (
        <>
            <Stack
                flexDirection={"column"}
                gap={2}
                my={5}
                width={"80%"}
                alignSelf={"center"}
            >

                <Post post={data?.post} />

                <Stack
                    flexDirection={"column"}
                    gap={2}
                    width={"100%"}
                    mx={"auto"}
                >

                    {
                        data?.post?.comments?.length > 0 ? 
                        (
                            data?.post?.comments?.map((comment) => (
                                <Comments key={comment._id} comment={comment} postId={data?.post?._id} />
                            ))
                        ) :
                        null
                    }

                </Stack>

                <Stack flexDirection={"row"} height={"10%"} alignItems={"center"}>

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
                        InputProps={{ sx: { color: textPrimary } }}
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                        onKeyUp={handleAddComment}
                    />
                    <Button onClick={handleAddCommentClick}>Send</Button>

                </Stack>
            </Stack>
        </>
    )
}

export default SinglePost