import { Stack } from "@mui/material"
import ProfileBar from "../../components/search/ProfileBar"
import SearchInput from "../../components/search/SearchInput"

const Search = () => {
  return (
    <>
      <Stack
        mx={"10px"}
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