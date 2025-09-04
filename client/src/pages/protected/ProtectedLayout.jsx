import { Stack } from "@mui/material"
import { Outlet } from "react-router-dom"
import Header from "../../components/common/Header"
import AddPost from "../../components/models/AddPost"
import EditProfile from "../../components/models/EditProfile"
import MainMenu from "../../components/menu/MainMenu"
import DeletePost from "../../components/menu/DeletePost"
import { useSelector } from "react-redux"

const ProtectedLayout = () => {
  const { DarkMode } = useSelector(state => state.service);
  const bg = DarkMode ? "#121212" : "#ffffff";
  const textPrimary = DarkMode ? "#f5f5f5" : "#000000";
  return (
    <Stack
      flexDirection={'column'}
      maxWidth={"800px"}
      minWidth={"100%"}
      mx={"auto"}
      overflow={"hidden"}
      sx={{
        bgcolor: bg,
        color: textPrimary,
        minHeight: "100vh",
        transition: "background-color .25s,color .25s"
      }}
    >
      {/* Protected content goes here */}
      <Header />

      <MainMenu />

      <AddPost />

      <EditProfile />

      <DeletePost />

      {/* Outlet renders the child routes */}
      <Outlet />
    </Stack>
  )
}

export default ProtectedLayout
