import { Avatar, Stack, Typography, IconButton, Box, Menu, MenuItem } from "@mui/material"
import { useState } from "react";
import { IoIosMore } from "react-icons/io"
import { useSelector } from "react-redux"

const Comments = () => {
    const { DarkMode } = useSelector(state => state.service);
    const hoverBg = DarkMode ? "#1f1f1f" : "#f3f3f3ff";
    const border = DarkMode ? "#333" : "#e0e0e0";
    const textSecondary = DarkMode ? "#bbb" : "#555";
    const textPrimary = DarkMode ? "#f5f5f5" : "#000";

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleDeleteComment = () => { }

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    py: 2,
                    px: 2,
                    borderBottom: `1px solid ${border}`,
                    transition: "background-color 0.2s ease",
                    "&:hover": {
                        backgroundColor: hoverBg
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
                                color={textPrimary}
                                sx={{ lineHeight: 1.2 }}
                            >
                                username
                            </Typography>

                            <Typography
                                variant="body2"
                                fontSize={"0.9rem"}
                                color={textSecondary}
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
                                color={DarkMode ? "#777" : "text.disabled"}
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
                            "&:hover": {
                                backgroundColor: DarkMode ? "#444" : "#eee",
                                cursor: "pointer"
                            }
                        }}
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                    >
                        <IoIosMore size={20} color={DarkMode ? "#f5f5f5" : "#000"} />
                    </IconButton>
                </Stack>
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                disableAutoFocus={true}
            >
                <MenuItem onClick={handleDeleteComment}>
                    Delete
                </MenuItem>
            </Menu>
        </>
    )
}

export default Comments