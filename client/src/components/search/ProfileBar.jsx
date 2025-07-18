import { Avatar, Button, Stack, Typography } from "@mui/material"

const ProfileBar = () => {
    return (
        <>
            <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                px={1}
                py={2}
                mx={"auto"}
                boxShadow={"-1px 3px 10px gray"}
                width={"90%"}
                maxWidth={"750px"}
                borderRadius={"15px"}
                sx={{
                    ":hover": {
                        cursor: "pointer",
                        boxShadow: "1px 6px 20px gray",
                    },
                    transition: "all 0.3s ease"
                }}
            >
                <Stack flexDirection={"row"} gap={1.5} alignItems={"center"}>
                    <Avatar src="" alt="" sx={{ width: 50, height: 50 }} />
                    <Stack flexDirection={"column"} gap={0} justifyContent={"center"}>
                        <Typography
                            variant="h6"
                            fontWeight={"bold"}
                            fontSize={"1.1rem"}
                            lineHeight={1.2}
                        >
                            User Name Here
                        </Typography>

                        <Typography 
                            variant="caption" 
                            color={"gray"}
                            fontSize={"0.9rem"}
                            lineHeight={1.1}
                        >
                            @userid_here
                        </Typography>

                        <Typography 
                            variant="caption" 
                            color={"gray"}
                            fontSize={"0.85rem"}
                            lineHeight={1.1}
                        >
                            followers here
                        </Typography>
                    </Stack>
                </Stack>

                <Button 
                    size="medium"
                    sx={{
                        border: "1px solid gray",
                        borderRadius: "20px",
                        color: "black",
                        px: 2,
                        py: 1,
                        height: 36,
                        minWidth: 80,
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