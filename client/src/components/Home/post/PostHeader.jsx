import { Avatar, AvatarGroup, Badge, Stack, Stepper } from '@mui/material'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const PostHeader = ({ isMobile, post }) => {
    const { DarkMode } = useSelector(state => state.service);
    const lineColor = DarkMode ? "#444" : "gray";

    return (
        <>
            <Stack
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"space-between"}
                width={{ xs: "45px", sm: "60px" }}
                minWidth={{ xs: "45px", sm: "60px" }}
            >
                <Link to={`/profile/zips/${post?.admin?._id}`}>
                    <Badge
                        overlap="circular"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        badgeContent={
                            <Avatar alt="+" src="" sx={{
                                width: isMobile ? 14 : 20,
                                height: isMobile ? 14 : 20,
                                bgcolor: "green",
                                position: "relative",
                                right: isMobile ? 2 : 4,
                                bottom: isMobile ? 2 : 4,
                                fontSize: isMobile ? "0.6rem" : "0.8rem"
                            }}
                            >
                                {" "}+{" "}
                            </Avatar>
                        }
                    >
                        <Avatar
                            alt={post?.admin?.username || "User"}
                            src={post?.admin?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                            sx={{
                                width: isMobile ? 30 : 40,
                                height: isMobile ? 30 : 40
                            }}
                        />
                    </Badge>
                </Link>

                <Stack
                    flexDirection={"column"}
                    alignItems={"center"}
                    gap={isMobile ? 0.5 : 1.5}
                    height={"100%"}
                >
                    <Stepper
                        orientation='vertical'
                        activeStep={0}
                        sx={{
                            border: `0.1rem solid ${lineColor}`,
                            width: "0px",
                            height: "100%",
                        }}
                    >
                    </Stepper>

                    {
                        post ? post.comments.length > 0 ?
                            (
                                <AvatarGroup total={post.comments.length} 
                                max={3}
                                sx={{
                                '& .MuiAvatar-root': {
                                    width: isMobile ? 18 : 24,
                                    height: isMobile ? 18 : 24,
                                    fontSize: isMobile ? 9 : 12,
                                }
                            }}>
                                <Avatar alt={post?.comments[0]?.admin.username || "User"} src={post?.comments[0]?.admin.profilePicture} />
                            </AvatarGroup>
                            ) : "" : ""
                    }
                </Stack>

            </Stack>
        </>
    )
}

export default PostHeader