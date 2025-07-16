import { Stack } from "@mui/material"
import { IoHomeSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";


const Navbar = () => {
    return (
        <>
            <Stack
                flexDirection={'row'}
                justifyContent={'space-around'}
                alignItems={'center'}
                maxWidth={'100%'}
            >
                <IoHomeSharp size={32} className="cursor-pointer"/>
                <FaSearch size={32}/>
                <FaEdit size={32}/>
                <FaHeart size={32}/>
                <RxAvatar size={32}/>
            </Stack>
        </>
    )
}

export default Navbar
