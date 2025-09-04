import { Avatar, Button, Stack, Typography, useMediaQuery } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { openAddPostModal } from "../../redux/serviceSlice.js";

const Input = () => {

    const _700 = useMediaQuery('(min-width:700px)')

    const dispatch = useDispatch();
    const { DarkMode } = useSelector(state => state.service);

    const cardBg = DarkMode ? "#000000ff" : "#ffffff";
    const textSecondary = DarkMode ? "#bbbbbb" : "gray";

    const handleAddPost = () => {
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
                        ":hover": { cursor: "pointer", bgcolor: DarkMode ? "#222" : "grey.100" },
                        bgcolor: cardBg,
                        color: textSecondary,
                        transition: "background-color .25s,color .25s"
                    }}
                >
                    <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
                        <Avatar />
                        <Typography color={textSecondary}>Drop a zip...</Typography>

                    </Stack>
                    <Button size="medium" sx={{
                        bgcolor: DarkMode ? "#333" : "black",
                        color: "white",
                        ":hover": {
                            bgcolor: DarkMode ? "#444" : "gray",
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