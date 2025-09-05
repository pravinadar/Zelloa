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

    const formatTimeAgo = (dateString) => {
        if (!dateString) return "";
        
        const now = new Date();
        const postTime = new Date(dateString);
        const diffInSeconds = Math.floor((now - postTime) / 1000);
        
        const intervals = [
            { label: 'y', seconds: 31536000 }, 
            { label: 'w', seconds: 604800 },   
            { label: 'd', seconds: 86400 },   
            { label: 'h', seconds: 3600 },     
            { label: 'm', seconds: 60 },       
        ];
        
        for (const interval of intervals) {
            const count = Math.floor(diffInSeconds / interval.seconds);
            if (count >= 1) {
                return isMobile ? `${count}${interval.label}` : `${count} ${interval.label === 'y' ? 'year' : interval.label === 'w' ? 'week' : interval.label === 'd' ? 'day' : interval.label === 'h' ? 'hour' : 'minute'}${count > 1 ? 's' : ''} ago`;
            }
        }
        
        return isMobile ? "now" : "just now";
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
                        {formatTimeAgo(post?.createdAt)}
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