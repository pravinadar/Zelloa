import { Stack } from "@mui/material"
import { IoHomeSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <Stack
                flexDirection={'row'}
                justifyContent={'space-around'}
                alignItems={'center'}
                maxWidth={'100%'}
            >

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

                <FaEdit size={32} />
                <FaHeart size={32} />
                <RxAvatar size={32} />
            </Stack>
        </>
    )
}

export default Navbar
