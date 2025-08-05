import { Avatar, Button, Stack, Typography, useMediaQuery } from "@mui/material"
import { useDispatch } from "react-redux"
import { openAddPostModal } from "../../redux/serviceSlice.js";

const Input = () => {

    const _700 = useMediaQuery('(min-width:700px)')

    const dispatch = useDispatch();

    const handleAddPost=()=>{
        dispatch(openAddPostModal(true))
    }

    return (
        <>
            {_700 ? (
                <Stack
                    flexDirection={"row"}
                    alignItems={"center"}
                    width={"70%"}
                    justifyContent={"space-between"}
                    p={3}
                    borderBottom={"2px solid gray"}
                    my={5}
                    mx={"auto"}
                    onClick={handleAddPost}
                    sx={{
                        ":hover": { cursor: "pointer", bgcolor: "grey.100" }
                    }}
                >
                    <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
                        <Avatar />
                        <Typography color="gray">Drop a zip...</Typography>

                    </Stack>
                    <Button size="medium" sx={{
                        bgcolor: "black",
                        color: "white",
                        ":hover": {
                            bgcolor: "gray",
                            cursor: "pointer"
                        }
                    }}>
                        POST
                    </Button>
                </Stack>
            ) : null}
        </>
    )
}

export default Input