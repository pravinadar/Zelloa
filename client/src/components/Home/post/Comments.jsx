import { Avatar, Stack, Typography, IconButton, Box, Menu, MenuItem } from "@mui/material"
import { useEffect, useState } from "react";
import { IoIosMore } from "react-icons/io"
import { useSelector } from "react-redux"
import { useDeleteCommentMutation, useSinglePostQuery } from "../../../redux/serviceAPI";

const Comments = ({ comment, postId }) => {
    const { DarkMode, myInfo } = useSelector(state => state.service);
    const hoverBg = DarkMode ? "#1f1f1f" : "#f3f3f3ff";
    const border = DarkMode ? "#333" : "#e0e0e0";
    const textSecondary = DarkMode ? "#bbb" : "#555";
    const textPrimary = DarkMode ? "#f5f5f5" : "#000";

    const [anchorEl, setAnchorEl] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [deleteComment, deleteCommentData] = useDeleteCommentMutation();
    const { refetch } = useSinglePostQuery(postId);

    const formatTimeAgo = (dateString) => {
        if (!dateString) return "";

        const now = new Date();
        const commentTime = new Date(dateString);
        const diffInSeconds = Math.floor((now - commentTime) / 1000);

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
                return `${count}${interval.label}`;
            }
        }

        return "now";
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleDeleteComment = async () => {
        await deleteComment({ postId, commentId: comment._id });
        handleClose();
        refetch();
    }

    const checkIsAdmin = () => {
        if (comment && myInfo) {
            if (comment.admin._id === myInfo._id) {
                setIsAdmin(true);
                return;
            }
        }
        setIsAdmin(false);
    }

    useEffect(() => {
        checkIsAdmin();
    }, [comment]);

    useEffect(() => {
        if (deleteCommentData.isSuccess) {
            console.log(deleteCommentData.data);
        }
        if (deleteCommentData.isError) {
            console.log(deleteCommentData.error.data);
        }
    }, [deleteCommentData.isSuccess, deleteCommentData.isError]);

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
                            src={comment?.admin?.profilePicture}
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
                                {comment?.admin?.username || "User"}
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
                                {comment?.text || ""}
                            </Typography>

                        </Stack>
                    </Stack>

                    <Stack flexDirection={"row"} alignContent={"center"} gap={1} >
                        <Typography
                            variant="caption"
                            color={DarkMode ? "#777" : "text.disabled"}
                            fontSize={"0.75rem"}
                            sx={{ mt: 0.7 }}
                        >
                            {formatTimeAgo(comment?.createdAt)}
                        </Typography>
                        {
                            isAdmin ? (
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
                            ) : null
                        }
                    </Stack>
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