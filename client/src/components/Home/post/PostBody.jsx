import { Stack, Typography, Box } from '@mui/material'
import { FaRegComment, FaRegHeart, FaRetweet } from 'react-icons/fa'
import { IoSend } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const PostBody = ({ isMobile }) => {
    return (
        <>
            <Stack
                flexDirection={"column"}
                justifyContent={"space-between"}
                gap={1}
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
                            fontSize={{ xs: "0.9rem", sm: "1rem" }}
                            fontWeight={"bold"}
                        >
                            Name
                        </Typography>
                        <Link to={"/post/1"} className="link">
                            <Typography
                                variant="h5"
                                fontSize={{ xs: "1rem", sm: "1.2rem" }}
                            >
                                Caption
                            </Typography>
                        </Link>
                    </Stack>

                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: { xs: '100%', sm: '400px' },
                            borderRadius: 1,
                            overflow: 'hidden'
                        }}
                    >
                        <img
                            src="https://placehold.co/600x400.png"
                            alt="Post"
                            loading='lazy'
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block'
                            }}
                        />
                    </Box>
                </Stack>

                <Stack flexDirection={"column"} gap={1}>
                    <Stack
                        flexDirection={"row"}
                        gap={{ xs: 1.5, sm: 2 }}
                        sx={{
                            '& svg': {
                                cursor: 'pointer',
                                transition: 'transform 0.2s ease',
                                '&:hover': {
                                    transform: 'scale(1.1)'
                                }
                            }
                        }}
                    >
                        <FaRegHeart size={isMobile ? 24 : 32} />
                        <FaRegComment size={isMobile ? 24 : 32} />
                        <FaRetweet size={isMobile ? 24 : 32} />
                        <IoSend size={isMobile ? 24 : 32} />
                    </Stack>
                </Stack>

                <Stack
                    flexDirection={{ xs: "column", sm: "row" }}
                    gap={0.5}
                    sx={{ ml: 0.5 }}
                >
                    <Typography
                        variant="caption"
                        color="gray"
                        fontSize={{ xs: "0.9rem", sm: "1.1rem" }}
                    >
                        {isMobile ? "12 likes" : "12 Likes Here"}
                    </Typography>
                    
                    <Typography
                        variant="caption"
                        color="gray"
                        fontSize={{ xs: "0.9rem", sm: "1.1rem" }}
                    >
                        {isMobile ? "5 comments" : "5 comments Here"}
                    </Typography>
                </Stack>

            </Stack>
        </>
    )
}

export default PostBody