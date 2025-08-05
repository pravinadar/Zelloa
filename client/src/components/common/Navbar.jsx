import { Box, Stack } from "@mui/material"
import { IoHomeSharp } from "react-icons/io5";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux"
import { openAddPostModal } from "../../redux/serviceSlice.js";

const Navbar = () => {
    const dispatch = useDispatch();

    const handleAddPost = () => {
        dispatch(openAddPostModal(true))
    }

    return (
        <>
            <Stack
                flexDirection={'row'}
                justifyContent={'space-around'}
                alignItems={'center'}
                maxWidth={'100%'}
            >
                <FaArrowLeft
                    size={32}
                    color={"black"}
                />

                <Link to={"/"} className="link">
                    <IoHomeSharp
                        size={32}
                        color={"black"}
                    />
                </Link>

                <Link to={"/search"} className="link">
                    <FaSearch
                        size={32}
                        color={"black"}
                    />
                </Link>

                <Box
                    sx={{
                        ":hover": { cursor: "pointer" }
                    }}>
                    <FaEdit size={32} onClick={handleAddPost} />
                </Box>

                <FaHeart size={32} />

                <Link to={"/profile/zips/1"} className="link">
                    <RxAvatar
                        size={32}
                        color={"black"}
                    />
                </Link>

            </Stack>
        </>
    )
}

export default Navbar
