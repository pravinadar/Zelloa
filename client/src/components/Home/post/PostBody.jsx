import { Stack, Typography, Box } from '@mui/material'
import { FaHeart, FaRegComment, FaRegHeart, FaRetweet } from 'react-icons/fa'
import { IoSend } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useLikePostMutation, useRePostMutation } from '../../../redux/serviceAPI'
import { useEffect, useState } from 'react'

const PostBody = ({ isMobile, post }) => {
    const { DarkMode, myInfo } = useSelector(state => state.service);
    const iconColor = DarkMode ? "#bbb" : "#555";
    const captionColor = DarkMode ? "#e0e0e0" : "#000";

    const [likePost] = useLikePostMutation();
    const [repost, repostData] = useRePostMutation();

    const [isLiked, setIsLiked] = useState(false);

    const handleLikePost = async () => {
        await likePost(post?._id).unwrap();

    }

    const checkIsLiked = () => {
        const isUserLiked = post?.likes?.some(user => user._id === myInfo?._id);

        if (isUserLiked) {
            setIsLiked(true);
            return;
        }
        setIsLiked(false);
    }

    const handleRePost = async () => {
        await repost(post?._id).unwrap();
    }

    useEffect(() => {
        checkIsLiked();
    }, [post]);

    useEffect(() => {
        if (repostData.isSuccess) {
            console.log("Post Reposted Successfully");
        }
        if (repostData.isError) {
            console.log(repostData.error.data);
        }
    }, [repostData.isSuccess, repostData.isError]);

    return (
        <>
            <Stack
                flexDirection={"column"}
                justifyContent={"space-between"}
                gap={isMobile ? 0.75 : 1.25}
                width={"100%"}
                flex={1}
            >
                <Stack
                    flexDirection={"column"}
                    gap={1}
                >
                    <Stack
                        flexDirection={"column"}
                    >
                        <Typography
                            variant="h6"
                            fontSize={{ xs: "0.85rem", sm: "1rem" }}
                            fontWeight={"bold"}
                            sx={{ lineHeight: 1.2 }}
                        >
                            {post?.admin?.username || "User"}
                        </Typography>

                        <Link to={`/post/${post?._id}`} className="caption-link" style={{ textDecoration: 'none' }}>
                            <Typography
                                variant="h5"
                                fontSize={{ xs: "0.95rem", sm: "1.2rem" }}
                                sx={{ lineHeight: 1.3, color: captionColor }}
                            >
                                {post?.text || ""}
                            </Typography>
                        </Link>
                    </Stack>

                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: { xs: '100%', sm: '400px', md: '500px' },
                            borderRadius: 1,
                        }}
                    >
                        {
                            post?.media ? (
                                <img
                                    src={post?.media || null}
                                    alt="Post Media"
                                    loading='lazy'
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        display: 'block'
                                    }}
                                />
                            ) : null
                        }

                    </Box>
                </Stack>

                <Stack flexDirection={"column"} gap={0.5}>
                    <Stack
                        flexDirection={"row"}
                        gap={{ xs: 1.5, sm: 2 }}
                        sx={{
                            '& svg': {
                                cursor: 'pointer',
                                transition: 'transform 0.2s ease',
                                color: iconColor,
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                    color: DarkMode ? "#fff" : "#000"
                                }
                            }
                        }}
                    >
                        {
                            isLiked ? (
                                <FaHeart size={isMobile ? 18 : 24}
                                    onClick={handleLikePost} />
                            ) : (
                                <FaRegHeart size={isMobile ? 18 : 24}
                                    onClick={handleLikePost} />
                            )
                        }

                        <Link to={`/post/${post?._id}#comments`}>
                            <FaRegComment size={isMobile ? 18 : 24} />
                        </Link>

                        <FaRetweet size={isMobile ? 18 : 24}
                            onClick={handleRePost} 
                        />

                        <IoSend size={isMobile ? 18 : 24} />
                    </Stack>
                </Stack>

                <Stack
                    flexDirection={"row"}
                    gap={1}
                    sx={{ ml: 0.5 }}
                >
                    <Typography
                        variant="caption"
                        color={DarkMode ? "#aaa" : "gray"}
                        fontSize={{ xs: "0.7rem", sm: "0.9rem" }}
                        fontWeight={500}
                    >
                        {post?.likes?.length || 0} {post?.likes?.length === 1 ? "like" : "likes"}
                    </Typography>

                    <Typography
                        variant="caption"
                        color={DarkMode ? "#aaa" : "gray"}
                        fontSize={{ xs: "0.7rem", sm: "0.9rem" }}
                        fontWeight={500}
                    >
                        {post?.comments?.length || 0} {post?.comments?.length === 1 ? "comment" : "comments"}
                    </Typography>
                </Stack>

            </Stack>
        </>
    )
}

export default PostBody