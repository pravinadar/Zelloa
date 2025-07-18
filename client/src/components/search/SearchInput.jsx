import { InputAdornment, TextField } from "@mui/material"
import { FaSearch } from "react-icons/fa"

const SearchInput = () => {
    return (
        <>
            <TextField sx={{
                width: "90%",
                maxWidth: "750px",
                boxShadow: "-1px 3px 10px gray",
                borderRadius: "15px",
                px: 2,
                py: 1,
                my: 5,
                mx: "auto",
                ":hover": {
                    boxShadow: "1px 6px 20px gray",
                },
                transition: "all 0.3s ease",
                '& .MuiOutlinedInput-root': {
                    color: "black",
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
                                <FaSearch />
                            </InputAdornment>
                        ),
                    },
                }} />
        </>
    )
}

export default SearchInput