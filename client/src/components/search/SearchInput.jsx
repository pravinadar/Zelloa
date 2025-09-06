import { InputAdornment, TextField, useMediaQuery } from "@mui/material"
import { FaSearch } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useLazySearchUserQuery } from "../../redux/serviceAPI";
import { useEffect, useState } from "react";
import { addToSearchedUsers } from "../../redux/serviceSlice";

const SearchInput = () => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const { DarkMode } = useSelector(state => state.service);
    const cardBg = DarkMode ? "#1e1e1e" : "#ffffff";
    const shadow = DarkMode ? "0 0 8px #000" : "-1px 3px 10px gray";
    const hoverShadow = DarkMode ? "0 0 14px #000" : "1px 6px 20px gray";

    const [searchUser, searchUserData] = useLazySearchUserQuery();
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();

    const handleSearch = async (e) => {
        if (query.trim() === "") return;
        if(query && e.key === "Enter") {
            await searchUser(query);
        }
    }

    useEffect(() => {
        if(query.trim() === "") {
            return;
        }
        if (searchUserData.isSuccess) {
            dispatch(addToSearchedUsers(searchUserData?.data?.users));
            console.log(searchUserData?.data);
        }
        if (searchUserData.isError) {
            console.log("Error in searching user : ", searchUserData?.error?.data?.message);
        }
    }, [searchUserData.isSuccess, searchUserData.isError]);

    return (
        <>
            <TextField sx={{
                width: "90%",
                maxWidth: "750px",
                boxShadow: shadow,
                bgcolor: cardBg,
                color: DarkMode ? "#f5f5f5" : "black",
                borderRadius: isMobile ? "10px" : "15px",
                px: isMobile ? 1 : 2,
                py: isMobile ? 0.5 : 1,
                my: isMobile ? 3 : 5,
                mx: "auto",
                ":hover": {
                    boxShadow: hoverShadow,
                },
                transition: "all 0.3s ease",
                '& .MuiOutlinedInput-root': {
                    color: DarkMode ? "#f5f5f5" : "black",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                    '& fieldset': {
                        border: "none",
                    }
                }
             }}
                placeholder="Search..."
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start" sx={{ color: 'black' }}>
                                <FaSearch size={isMobile ? 14 : 18} color={DarkMode ? "#f5f5f5" : "black"} />
                            </InputAdornment>
                        ),
                    },
                }}
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={handleSearch}
            />
        </>
    )
}

export default SearchInput