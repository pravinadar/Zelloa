import { Stack } from "@mui/material"
import { Outlet } from "react-router-dom"
import Header from "../../components/common/Header"
import AddPost from "../../components/models/AddPost"

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
        <AddPost/> {/* Testing AddPost component */}
        {/* Outlet renders the child routes */}
        <Outlet />
    </Stack>
  )
}

export default ProtectedLayout
