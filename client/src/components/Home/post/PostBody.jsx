import { Stack, Typography } from '@mui/material'
import { FaRegComment, FaRegHeart, FaRetweet } from 'react-icons/fa'
import { IoSend } from 'react-icons/io5'

const PostBody = () => {
    return (
        <>
            <Stack
                flexDirection={"column"}
                justifyContent={"space-between"}
                gap={1}
            >
                <Stack
                    flexDirection={"column"}
                    gap={1}
                >
                    <Stack
                        flexDirection={"column"}
                    >
                        <Typography variant="h6" fontSize={"1rem"} fontWeight={"bold"}>
                            Name
                        </Typography>
                        <Typography variant="h5" fontSize={"1.2rem"}>
                            Caption
                        </Typography>

                    </Stack>

                    <img
                        src="https://placehold.co/600x400.png"
                        alt="Post"
                        loading='lazy'
                        width={400}
                        height={"auto"}
                    />

                </Stack>

                <Stack flexDirection={"column"} gap={1} >
                    <Stack flexDirection={"row"} gap={2}>
                        <FaRegHeart size={32} />
                        <FaRegComment size={32} />
                        <FaRetweet size={32} />
                        <IoSend size={32} />
                    </Stack>
                </Stack>

                <Stack flexDirection={"row"} gap={1} position={"relative"} left={4}>
                    <Typography variant="caption" color="gray" fontSize={"1.1rem"}>
                        Likes Here .
                    </Typography>
                    <Typography variant="caption" color="gray" fontSize={"1.1rem"}>
                        comments Here
                    </Typography>
                </Stack>

            </Stack>
        </>
    )
}

export default PostBody
