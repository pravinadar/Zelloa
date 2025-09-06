import { Avatar, Button, Chip, Stack, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { Link, Outlet, useParams } from "react-router-dom"
import { openEditProfileModal } from "../../../redux/serviceSlice.js";
import { useFollowUserMutation, useUserDetailsQuery } from "../../../redux/serviceAPI.js";
import { useEffect, useState } from "react";

const ProfileLayout = () => {
    const dispatch = useDispatch();
    const { DarkMode, myInfo } = useSelector(state => state.service);
    const logoSrc = DarkMode ? "/logo-darkmode2.svg" : "/logo-lightmode2.svg";
    const borderColor = DarkMode ? "#333" : "gray";
    const textSecondary = DarkMode ? "#bbb" : "gray";

    const params = useParams();
    const { data } = useUserDetailsQuery(params?.id);
    const [followUser, followUserData] = useFollowUserMutation();

    const [myAccount, setMyAccount] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    const handleEditProfile = () => {
        dispatch(openEditProfileModal(true));
    }

    const checkIsFollowing = () => {
        if (myInfo && data) {
            const isFollowingUser = data.user.followers.some(follower => follower._id === myInfo._id);
            setIsFollowing(isFollowingUser);
        }
    }

    const checkIsMyAccount = () => {
        if (myInfo && data) {
            setMyAccount(myInfo._id === data.user.id);
        }
    }

    const handleFollowUser = async () => {
        if (data) {
            await followUser(data.user.id);
            checkIsFollowing();
        }
    }

    useEffect(() => {
        if (followUserData?.isSuccess) {
            console.log(followUserData?.data);
        }
        if (followUserData?.isError) {
            console.log(followUserData?.error?.data);
        }
    }, [followUserData?.isSuccess, followUserData?.isError])

    useEffect(() => {
        checkIsMyAccount();
        checkIsFollowing();
    }, [data])

    return (
        <>
            <Stack
                flexDirection={"column"}
                gap={2}
                m={2}
                p={2}
                width={"90%"}
                maxWidth={"800px"}
                mx={"auto"}
            >

                <Stack
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Stack
                        flexDirection={"column"}
                        gap={1}
                    >

                        <Typography
                            variant="h2"
                            fontWeight={"bold"}
                            fontSize={"2rem"}
                        >
                            @{data?.user?.username || "User Name"}

                        </Typography>

                        {/* <Stack
                            flexDirection={"row"}
                            alignItems={"center"}
                            gap={1}
                        >

                            <Typography
                                variant="h2"
                                fontSize={"1rem"}
                            >
                                User Name Here

                            </Typography>

                            <Chip
                                label="zelloa.in"
                                size="small"
                                sx={{
                                    fontSize: "0.8rem"
                                }}
                            />

                        </Stack> */}

                    </Stack>

                    <Avatar src={data?.user?.profilePicture || ""} alt={data?.user?.username || "User Name"}
                        sx={{
                            width: 60,
                            height: 60,
                        }}
                    />

                </Stack>

                <Typography variant="subtitle2">
                    {data?.user?.bio || "bio"}
                </Typography>

                <Stack
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >

                    <Typography
                        variant="subtitle2"
                        color="gray"
                    >

                        {data?.user?.followers?.length || 0} Followers

                    </Typography>

                    <Link to={"/"} >
                        <img src={logoSrc} alt="logo" width={40} />
                    </Link>

                </Stack>

            </Stack>


            <Button
                size="large"
                sx={{
                    color: DarkMode ? "#f5f5f5" : "black",
                    width: "90%",
                    maxWidth: "800px",
                    mx: "auto",
                    textAlign: "center",
                    border: `1px solid ${borderColor}`,
                    borderRadius: "10px",
                    ":hover": {
                        cursor: "pointer",
                        backgroundColor: DarkMode ? "#222" : "lightgray",
                    },
                    transition: "all 0.3s ease",
                }}
                onClick={myAccount ? handleEditProfile : handleFollowUser}
            >
                {myAccount ? "Edit Profile" : isFollowing ? "Unfollow" : "Follow"}
            </Button>



            <Stack
                flexDirection={"row"}
                justifyContent={"space-evenly"}
                my={5}
                pb={2}
                mx={"auto"}
                borderBottom={"2px solid gray"}
                fontSize={"1.2rem"}
                width={"90%"}
                maxWidth={"800px"}
                sx={{ borderBottom: `2px solid ${borderColor}` }}
            >

                <Link to={'/profile/zips/1'} className="link" style={{ color: DarkMode ? "#f5f5f5" : "#000" }}>  {/* to be edited */}
                    Zips
                </Link>
                <Link to={'/profile/replies/1'} className="link" style={{ color: DarkMode ? "#f5f5f5" : "#000" }}>
                    Replies
                </Link>
                <Link to={'/profile/rezips/1'} className="link" style={{ color: DarkMode ? "#f5f5f5" : "#000" }}>
                    Rezips
                </Link>

            </Stack>

            <Outlet />
        </>
    )
}

export default ProfileLayout