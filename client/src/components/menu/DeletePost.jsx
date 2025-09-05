import { Menu, MenuItem } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { toggleDeletePost } from "../../redux/serviceSlice.js";
import { useDeletePostMutation } from "../../redux/serviceAPI.js";
import { useEffect } from "react";

const DeletePost = () => {
  const { DeletePost, DarkMode, postId } = useSelector(state => state.service);

  const dispatch = useDispatch();
  const [deletePost, deletePostData] = useDeletePostMutation();

  const handleClose = () => {
    dispatch(toggleDeletePost(false));
  }

  const handleDeletePost = async () => {
    await deletePost(postId);
    handleClose();
  }

  useEffect(() => {
    if (deletePostData.isSuccess) {
      console.log(deletePostData.data);
    }
    if (deletePostData.isError) {
      console.log(deletePostData.data);
    }

  }, [deletePostData.isSuccess, deletePostData.isError]);

  return (
    <Menu
      anchorEl={DeletePost}
      open={Boolean(DeletePost)}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      disableAutoFocusItem={true}
      PaperProps={{
        sx: {
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