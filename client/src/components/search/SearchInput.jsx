import { InputAdornment, TextField, useMediaQuery } from "@mui/material"
import { FaSearch } from "react-icons/fa"

const SearchInput = () => {
    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        <>
            <TextField sx={{
                width: "90%",
                maxWidth: "750px",
                boxShadow: "-1px 3px 10px gray",
                borderRadius: isMobile ? "10px" : "15px",
                px: isMobile ? 1 : 2,
                py: isMobile ? 0.5 : 1,
                my: isMobile ? 3 : 5,
                mx: "auto",
                ":hover": {
                    boxShadow: "1px 6px 20px gray",
                },
                transition: "all 0.3s ease",
                '& .MuiOutlinedInput-root': {
                    color: "black",
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
                                <FaSearch size={isMobile ? 14 : 18} />
                            </InputAdornment>
                        ),
                    },
                }} />
        </>
    )
}

export default SearchInput