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
                borderBottom={"2px solid gray"}
                p={isMobile ? 1 : 1.5}
                sx={{
                    ":hover": {
                        cursor: "pointer",
                        boxShadow: { xs: "3px 3px 5px rgba(0,0,0,0.2)", sm: "5px 5px 10px rgba(0,0,0,0.2)" },
                    },
                    transition: "all 0.2s ease-in-out"
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
                    alignItems="flex-start"
                    gap={1}
                    minWidth={{ xs: "70px", sm: "140px" }}
                >
                    <Typography
                        variant="caption"
                        color={"gray"}
                        fontSize={{ xs: "0.7rem", sm: "0.9rem" }}
                        textAlign="right"
                    >
                        {isMobile ? "2h" : "2 hours ago"}
                    </Typography>

                    <MdOutlineMoreHoriz size={isMobile ? 18 : 24} style={{ flexShrink: 0 }} />
                </Stack>
            </Stack>
        </>
    )
}

export default Post