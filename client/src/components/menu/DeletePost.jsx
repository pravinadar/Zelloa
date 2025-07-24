import { Menu, MenuItem } from "@mui/material"

const DeletePost = () => {

  const handleClose = () => { }

  const handleDeletePost = () => { }

  return (
    <Menu
      anchorEl={""} 
      open={true} 
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <MenuItem onClick={handleDeletePost}>
        Delete
      </MenuItem>
    </Menu>
  )
}

export default DeletePost