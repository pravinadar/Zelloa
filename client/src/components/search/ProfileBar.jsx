import { Avatar, Button, Stack, Typography, useMediaQuery } from "@mui/material"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

const ProfileBar = ({ user }) => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const { DarkMode } = useSelector(state => state.service);
    const cardBg = DarkMode ? "#1e1e1e" : "#ffffff";
    const hoverShadow = DarkMode ? "0 0 14px #000" : "1px 6px 20px gray";
    const baseShadow = DarkMode ? "0 0 8px #000" : "-1px 3px 10px gray";

    return (
        <>
            <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                px={isMobile ? 0.75 : 1}
                py={isMobile ? 1.5 : 2}
                mx={"auto"}
                boxShadow={baseShadow}
                width={"90%"}
                maxWidth={"750px"}
                borderRadius={isMobile ? "10px" : "15px"}
                sx={{
                    ":hover": {
                        cursor: "pointer",
                        boxShadow: hoverShadow,
                    },
                    bgcolor: cardBg,
                    color: DarkMode ? "#f5f5f5" : "#000",
                    transition: "all 0.3s ease"
                }}
            >
                <Stack flexDirection={"row"} gap={isMobile ? 1 : 1.5} alignItems={"center"}>
                    <Avatar src={user?.profilePicture} alt="profile picture" sx={{ width: isMobile ? 40 : 50, height: isMobile ? 40 : 50 }} />
                    <Stack flexDirection={"column"} gap={1} justifyContent={"center"}>
                        <Link to={`/profile/zips/${user?.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                            <Typography
                                variant="h6"
                                fontWeight={"bold"}
                                fontSize={isMobile ? "0.95rem" : "1.1rem"}
                                lineHeight={1}
                            >
                                @{user?.username || "User"}
                            </Typography>

                            {/* <Typography
                            variant="caption"
                            color={"gray"}
                            fontSize={isMobile ? "0.8rem" : "0.9rem"}
                            lineHeight={1.3}
                            >
                            @userid_here
                        </Typography> */}

                            <Typography
                                variant="caption"
                                color={"gray"}
                                fontSize={isMobile ? "0.75rem" : "0.85rem"}
                                fontWeight={"bold"}
                                lineHeight={1}
                            >
                                {user?.followers?.length || 0} {user?.followers?.length === 1 ? "Follower" : "Followers"}
                            </Typography>
                        </Link>
                    </Stack>
                </Stack>

                <Button
                    size={isMobile ? "small" : "medium"}
                    sx={{
                        border: "1px solid gray",
                        borderRadius: isMobile ? "8px" : "10px",
                        color: DarkMode ? "#f5f5f5" : "black",
                        px: isMobile ? 1.5 : 2,
                        py: isMobile ? 0.5 : 1,
                        height: isMobile ? 30 : 36,
                        minWidth: isMobile ? 65 : 80,
                        fontSize: isMobile ? "0.8rem" : "0.875rem",
                        ":hover": {
                            backgroundColor: DarkMode ? "#333" : "lightgray",
                        },
                        transition: "all 0.3s ease",
                    }}
                >
                    Follow
                </Button>
            </Stack>
        </>
    )
}

export default ProfileBar