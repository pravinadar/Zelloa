import { Stack, Typography, useMediaQuery } from '@mui/material'
import { MdOutlineMoreHoriz } from "react-icons/md";
import PostHeader from './post/PostHeader';
import PostBody from './post/PostBody';
import { useDispatch, useSelector } from 'react-redux';
import { addPostId, toggleDeletePost } from '../../redux/serviceSlice';
import { useEffect, useState } from 'react';

const Post = ({post}) => {
    const isMobile = useMediaQuery('(max-width:700px)')

    const dispatch = useDispatch();
    const { DarkMode, myInfo } = useSelector(state => state.service);
    const handleToggleDeletePost = (e) => {
        dispatch(toggleDeletePost(e.currentTarget));
        dispatch(addPostId(post._id));
    }

    const [isAdmin,setIsAdmin] = useState();

    const checkIsAdmin = () =>{
        if(post?.admin._id === myInfo._id){
            setIsAdmin(true)
        }
    }

    useEffect(()=>{
        if(post && myInfo){
            checkIsAdmin();
        }
    },[post,myInfo])

    const borderColor = DarkMode ? "#333" : "gray";
    const hoverShadow = DarkMode ? "5px 5px 10px rgba(0,0,0,0.6)" : "5px 5px 10px rgba(0,0,0,0.2)";
    const cardBg = DarkMode ? "#090909ff" : "#fff";

    return (
        <>
            <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
                borderBottom={`2px solid ${borderColor}`}
                p={isMobile ? 1 : 1.5}
                sx={{
                    ":hover": {
                        cursor: "pointer",
                        boxShadow: { xs: hoverShadow, sm: hoverShadow },
                    },
                    bgcolor: cardBg,
                    transition: "background-color .25s, box-shadow .2s"
                }}>

                <Stack
                    flexDirection={"row"}
                    gap={{ xs: 1, sm: 2 }}
                    width="100%"
                >
                    <PostHeader isMobile={isMobile} post={post} />
                    <PostBody isMobile={isMobile} post={post} />
                </Stack>

                <Stack
                    flexDirection={"row"}
                    alignItems="flex-start"
                    gap={1}
                    minWidth={{ xs: "70px", sm: "140px" }}
                >
                    <Typography
                        variant="caption"
                        color={DarkMode ? "#aaa" : "gray"}
                        fontSize={{ xs: "0.7rem", sm: "0.9rem" }}
                        textAlign="right"
                    >
                        {isMobile ? "2h" : "2 hours ago"}
                    </Typography>

                    { isAdmin ? (

                        <MdOutlineMoreHoriz
                        size={isMobile ? 18 : 24}
                        style={{ flexShrink: 0 }}
                        onClick={handleToggleDeletePost}
                        />
                    ) : null
                    }
                </Stack>
            </Stack>
        </>
    )
}

export default Post