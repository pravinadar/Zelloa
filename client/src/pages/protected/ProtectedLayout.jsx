import { Stack } from "@mui/material"
import { Outlet } from "react-router-dom"
import Header from "../../components/common/Header"
import AddPost from "../../components/models/AddPost"
import EditProfile from "../../components/models/EditProfile"
import MainMenu from "../../components/menu/MainMenu"

const ProtectedLayout = () => {
  return (
    <Stack
      flexDirection={'column'}
      maxWidth={"800px"}
      minWidth={"100%"}
      mx={"auto"}
      overflow={"hidden"}
    >
        {/* Protected content goes here */}
        <Header />

        {/* Testing MainMenu component */}
        {/* <MainMenu/>  */}

        {/*Testing AddPost component */}
        <AddPost/> 

        {/*Testing EditProfile component */}
        <EditProfile/> 

        {/* Outlet renders the child routes */}
        <Outlet />
    </Stack>
  )
}

export default ProtectedLayout
