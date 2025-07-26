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
                            Name
                        </Typography>

                        <Link to={"/post/1"} className="caption-link" style={{ textDecoration: 'none' }}>
                            <Typography
                                variant="h5"
                                fontSize={{ xs: "0.95rem", sm: "1.2rem" }}
                                sx={{ lineHeight: 1.3 }}
                            >
                                Caption
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
                        <img
                            src="https://placehold.co/600x400.png"
                            alt="Post"
                            loading='lazy'
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block'
                            }}
                        />
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
                                color: '#555',
                                '&:hover': {
                                    transform: 'scale(1.1)'
                                }
                            }
                        }}
                    >
                        <FaRegHeart size={isMobile ? 18 : 24} />
                        <FaRegComment size={isMobile ? 18 : 24} />
                        <FaRetweet size={isMobile ? 18 : 24} />
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
                        color="gray"
                        fontSize={{ xs: "0.7rem", sm: "0.9rem" }}
                        fontWeight={500}
                    >
                        12 Likes
                    </Typography>
                    
                    <Typography
                        variant="caption"
                        color="gray"
                        fontSize={{ xs: "0.7rem", sm: "0.9rem" }}
                        fontWeight={500}
                    >
                        5 Comments
                    </Typography>
                </Stack>

            </Stack>
        </>
    )
}

export default PostBody