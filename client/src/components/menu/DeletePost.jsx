import { Menu, MenuItem } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { toggleDeletePost } from "../../redux/serviceSlice.js";

const DeletePost = () => {
  const {DeletePost:anchorEl, DarkMode } = useSelector(state => state.service);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleDeletePost(false));
  }

  const handleDeletePost = () => { }

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      disableAutoFocusItem={true}
      PaperProps={{
        sx:{
          bgcolor: DarkMode ? "#1e1e1e" : "#fff",
          color: DarkMode ? "#f5f5f5" : "#000"
        }
      }}
    >
      <MenuItem onClick={handleDeletePost}>
        Delete
      </MenuItem>
    </Menu>
  )
}

export default DeletePost