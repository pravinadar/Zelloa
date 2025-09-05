import { Stack, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import ProfileBar from "../../components/search/ProfileBar"
import SearchInput from "../../components/search/SearchInput"

const Search = () => {
  const { DarkMode, searchedUsers } = useSelector(state => state.service);
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

        {
          searchedUsers ? (
            searchedUsers.length > 0 ? searchedUsers.map(
              user => <ProfileBar key={user._id} user={user} />
            ) : (<Typography variant="h6" textAlign={"center"} mt={2}>No users found</Typography>)
          ) : (
            <Typography variant="h6" textAlign={"center"} mt={2}>Search for users</Typography>
          )
        }
        <ProfileBar/>

      </Stack>
    </>
  )
}

export default Search