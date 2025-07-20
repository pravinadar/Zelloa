import { Stack, Typography, useMediaQuery } from '@mui/material'
import { MdOutlineMoreHoriz } from "react-icons/md";
import PostHeader from './post/PostHeader';
import PostBody from './post/PostBody';

const Post = () => {
    const isMobile = useMediaQuery('(max-width:700px)')
    
    return (
        <>
            <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
                borderBottom={"3px solid gray"}
                p={{ xs: 1, sm: 2 }}
                sx={{
                    ":hover": {
                        cursor: "pointer",
                        boxShadow: { xs: "5px 5px 5px gray", sm: "10px 10px 10px gray" },
                    },
                    transition: "all 0.3s ease"
                }}>

                <Stack 
                    flexDirection={"row"} 
                    gap={{ xs: 1, sm: 2 }}
                    width="100%"
                >
                    <PostHeader isMobile={isMobile} />
                    <PostBody isMobile={isMobile} />
                </Stack>

                <Stack
                    flexDirection={"row"}
                    gap={1}
                    minWidth={{ xs: "120px", sm: "140px" }}
                >
                    <Typography
                        variant="caption"
                        color={"gray"}
                        fontSize={{ xs: "0.8rem", sm: "1rem" }}
                        textAlign="center"
                    >
                        {isMobile ? "2h" : "2 hours ago"}
                    </Typography>

                    <MdOutlineMoreHoriz size={isMobile ? 20 : 28} />
                </Stack>
            </Stack>
        </>
    )
}

export default Post