import { Avatar, Button, Chip, Stack, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { Link, Outlet } from "react-router-dom"
import { openEditProfileModal } from "../../../redux/serviceSlice.js";

const ProfileLayout = () => {
    const dispatch = useDispatch();

    const handleEditProfile = () => {
        dispatch(openEditProfileModal(true));
    }

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
                            User Name Here

                        </Typography>

                        <Stack
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

                        </Stack>

                    </Stack>

                    <Avatar src="" alt=""
                        sx={{
                            width: 60,
                            height: 60,
                        }}
                    />

                </Stack>

                <Typography variant="subtitle2">
                    User Bio Here
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

                        Number of Followers Here

                    </Typography>

                    <Link to={"/"} >
                        <img src="/logo-lightmode2.svg" alt="logo" width={40} />
                    </Link>

                </Stack>

            </Stack>

            <Button
                size="large"
                sx={{
                    color: "black",
                    width: "90%",
                    maxWidth: "800px",
                    mx: "auto",
                    textAlign: "center",
                    border: "1px solid gray",
                    borderRadius: "10px",
                    ":hover": {
                        cursor: "pointer",
                        backgroundColor: "lightgray",
                    },
                    transition: "all 0.3s ease",
                }}
                onClick={handleEditProfile}
            >
                Edit Profile
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
            >

                <Link to={'/profile/zips/1'} className="link">  {/* to be edited */}
                    Zips
                </Link>
                <Link to={'/profile/replies/1'} className="link">
                    Replies
                </Link>
                <Link to={'/profile/rezips/1'} className="link">
                    Rezips
                </Link>

            </Stack>

            <Outlet />
        </>
    )
}

export default ProfileLayout