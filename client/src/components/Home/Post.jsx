import { Stack, Typography } from '@mui/material'
import { MdOutlineMoreHoriz } from "react-icons/md";
import PostHeader from '../post/PostHeader';
import PostBody from '../post/PostBody';

const Post = () => {
    return (
        <>
            <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
                borderBottom={"3px solid gray"}
                width={"100%"}
                p={2}
                sx={{
                    ":hover": {
                        cursor: "pointer",
                        boxShadow: "10px 10px 10px gray",
                    },
                    transition: "all 0.3s ease"
                }}>

                <Stack flexDirection={"row"} gap={2}>
                    <PostHeader />
                    <PostBody />
                </Stack>

                <Stack
                    flexDirection={"row"}
                    justifyContent={"center"}
                    gap={1}
                    fontSize={"1rem"}>

                    <Typography
                        variant="caption"
                        color={"gray"}
                        fontSize={"1rem"}
                        position={"relative"}
                        top={2}
                    >
                        time here
                    </Typography>

                    <MdOutlineMoreHoriz size={28} />

                </Stack>
            </Stack>
        </>
    )
}

export default Post