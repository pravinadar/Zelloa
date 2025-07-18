import { Avatar, Stack, Typography, IconButton, Box } from "@mui/material"
import { IoIosMore } from "react-icons/io"

const Comments = () => {
    return (
        <Box
            sx={{
                width: "100%",
                py: 2,
                px: 2,
                borderBottom: "1px solid #e0e0e0",
                transition: "background-color 0.2s ease",
                "&:hover": {
                    backgroundColor: "#f3f3f3ff"
                }
            }}
        >

            <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"flex-start"}
                gap={2}
            >

                <Stack
                    flexDirection={"row"}
                    alignItems={"flex-start"}
                    gap={2}
                    flex={1}
                >

                    <Avatar
                        src=""
                        alt="User Avatar"
                        sx={{
                            width: 40,
                            height: 40,
                            border: "1px solid #000000ff"
                        }}
                    />

                    <Stack
                        flexDirection={"column"}
                        gap={0.5}
                        flex={1}
                    >
                        
                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            fontSize={"0.95rem"}
                            color={"text.primary"}
                            sx={{ lineHeight: 1.2 }}
                        >
                            username
                        </Typography>

                        <Typography
                            variant="body2"
                            fontSize={"0.9rem"}
                            color={"text.secondary"}
                            sx={{
                                lineHeight: 1.4,
                                wordBreak: "break-word",
                                mt: 0.5
                            }}
                        >
                            This is a sample comment that demonstrates how the comment will look in the actual application.
                        </Typography>

                        <Typography
                            variant="caption"
                            color={"text.disabled"}
                            fontSize={"0.75rem"}
                            sx={{ mt: 1 }}
                        >
                            time here
                        </Typography>
                    </Stack>
                </Stack>

                <IconButton
                    size="small"
                    sx={{
                        color: "text.disabled",
                        "&:hover": {
                            color: "text.secondary",
                            backgroundColor: "#f5f5f5"
                        }
                    }}
                >
                    <IoIosMore size={20} />
                </IconButton>
            </Stack>
        </Box>
    )
}

export default Comments