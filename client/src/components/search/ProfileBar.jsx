import { Avatar, Button, Stack, Typography, useMediaQuery } from "@mui/material"

const ProfileBar = () => {
    const isMobile = useMediaQuery('(max-width:600px)');
    
    return (
        <>
            <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                px={isMobile ? 0.75 : 1}
                py={isMobile ? 1.5 : 2}
                mx={"auto"}
                boxShadow={"-1px 3px 10px gray"}
                width={"90%"}
                maxWidth={"750px"}
                borderRadius={isMobile ? "10px" : "15px"}
                sx={{
                    ":hover": {
                        cursor: "pointer",
                        boxShadow: "1px 6px 20px gray",
                    },
                    transition: "all 0.3s ease"
                }}
            >
                <Stack flexDirection={"row"} gap={isMobile ? 1 : 1.5} alignItems={"center"}>
                    <Avatar src="" alt="" sx={{ width: isMobile ? 40 : 50, height: isMobile ? 40 : 50 }} />
                    <Stack flexDirection={"column"} gap={0} justifyContent={"center"}>
                        <Typography
                            variant="h6"
                            fontWeight={"bold"}
                            fontSize={isMobile ? "0.95rem" : "1.1rem"}
                            lineHeight={1}
                        >
                            User Name Here
                        </Typography>

                        <Typography 
                            variant="caption" 
                            color={"gray"}
                            fontSize={isMobile ? "0.8rem" : "0.9rem"}
                            lineHeight={1.3}
                        >
                            @userid_here
                        </Typography>

                        <Typography 
                            variant="caption" 
                            color={"gray"}
                            fontSize={isMobile ? "0.75rem" : "0.85rem"}
                            fontWeight={"bold"}
                            lineHeight={1}
                        >
                            followers here
                        </Typography>
                    </Stack>
                </Stack>

                <Button 
                    size={isMobile ? "small" : "medium"}
                    sx={{
                        border: "1px solid gray",
                        borderRadius: isMobile ? "8px" : "10px",
                        color: "black",
                        px: isMobile ? 1.5 : 2,
                        py: isMobile ? 0.5 : 1,
                        height: isMobile ? 30 : 36,
                        minWidth: isMobile ? 65 : 80,
                        fontSize: isMobile ? "0.8rem" : "0.875rem",
                        ":hover": {
                            backgroundColor: "lightgray",
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