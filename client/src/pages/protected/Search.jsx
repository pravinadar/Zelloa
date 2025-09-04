import { Stack } from "@mui/material"
import { useSelector } from "react-redux"
import ProfileBar from "../../components/search/ProfileBar"
import SearchInput from "../../components/search/SearchInput"

const Search = () => {
  const { DarkMode } = useSelector(state => state.service);
  const textPrimary = DarkMode ? "#f5f5f5" : "#000";
  return (
    <>
      <Stack
        mx={"10px"}
        sx={{ color: textPrimary }}
      >
        <SearchInput />
      </Stack>
      <Stack
        flexDirection={'column'}
        gap={2}
        mb={10}
        mx={"10px"}
      >

        <ProfileBar /> {/* Example ProfileBar component usage */}
        <ProfileBar />
        <ProfileBar />
        <ProfileBar />

      </Stack>
    </>
  )
}

export default Search