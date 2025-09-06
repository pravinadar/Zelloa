import { Stack } from "@mui/material"
import { useSelector } from "react-redux"

import Post from "../../../components/Home/Post"

const Zips = () => {
  const { DarkMode, user } = useSelector(state => state.service);
  return (
    <>
      <Stack
        flexDirection={"column"}
        gap={2}
        mb={10}
        width={"100%"}
        maxWidth={"850px"}
        mx={"auto"}
        sx={{ color: DarkMode ? "#f5f5f5" : "#000" }}
      >

        {
          user?.user?.zips?.length > 0 ? (
            user?.user?.zips?.map((zip) => (
              <Post post={zip} key={zip?._id} />
            ))
          ) : (
            <Stack
              mx={"auto"}
              sx={{ color: DarkMode ? "#f5f5f5" : "#000" }}
            >
              No zips found.
            </Stack>
          )}

      </Stack>
    </>
  )
}

export default Zips