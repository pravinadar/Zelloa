import { Avatar, Box, Stack, useMediaQuery } from "@mui/material"
import { IoHomeSharp } from "react-icons/io5";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { openAddPostModal } from "../../redux/serviceSlice.js";
import { useEffect, useState } from "react";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isMobile = useMediaQuery('(max-width:700px)')
    const { DarkMode, myInfo } = useSelector(state => state.service);
    const iconColor = DarkMode ? "#f5f5f5" : "black";

    const [showArrow, setShowArrow] = useState(false);

    const checkArrow = () => {
        if (window.location.pathname.startsWith("/post/") && !isMobile) {
            setShowArrow(true);
            return;
        }
        setShowArrow(false);
    }

    const handleAddPost = () => {
        dispatch(openAddPostModal(true))
    }

    useEffect(()=>{
        checkArrow();
    },[window.location.pathname])

    return (
        <>
            <Stack
                flexDirection={'row'}
                justifyContent={'space-around'}
                alignItems={'center'}
                maxWidth={'100%'}
            >
                {
                    showArrow ? (
                        <FaArrowLeft size={32} color={iconColor} onClick={() => navigate(-1)} />
                    ) : null
                }
                

                <Link to={"/"} className="link">
                    <IoHomeSharp
                        size={32}
                        color={iconColor}
                    />
                </Link>

                <Link to={"/search"} className="link">
                    <FaSearch
                        size={32}
                        color={iconColor}
                    />
                </Link>

                <Box
                    sx={{
                        ":hover": { cursor: "pointer" }
                    }}>
                    <FaEdit size={32} onClick={handleAddPost} />
                </Box>

                <FaHeart size={32} color={iconColor} />

                <Link to={`/profile/zips/${myInfo?._id}`} className="link">
                    <Avatar
                        src={myInfo?.profilePicture}
                        size={32}
                        color={iconColor}
                    />
                </Link>

            </Stack>
        </>
    )
}

export default Navbar
