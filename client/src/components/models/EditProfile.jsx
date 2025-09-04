import { Avatar, Box, Button, Dialog, DialogContent, DialogTitle, Input, Stack, Typography, useMediaQuery } from "@mui/material"
import { useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { openEditProfileModal } from "../../redux/serviceSlice.js";

const EditProfile = () => {

  const _700 = useMediaQuery("(min-width:700px)");

  const [picture, setPicture] = useState()
  const [bio, setBio] = useState("")

  const imgRef = useRef()

  const { EditProfileModal, DarkMode } = useSelector(state => state.service)
  const bg = DarkMode ? "#1e1e1e" : "#ffffff";
  const textPrimary = DarkMode ? "#f5f5f5" : "#000";

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(openEditProfileModal(false));
  }

  const handlePhoto = () => {
    imgRef.current.click();
  }

  const handleUpdate = () => { }

  return (
    <>
      <Dialog
        open={EditProfileModal}
        onClose={handleClose}
        fullWidth
        fullScreen={_700 ? false : true}
        PaperProps={{
          sx: {
            bgcolor: bg,
            color: textPrimary,
            transition: "background-color .25s,color .25s"
          }
        }}
      >

        <Box
          position={"absolute"}
          top={20}
          right={20}
          onClick={handleClose}
          sx={{
            padding: 1,
            ":hover": { cursor: "pointer", bgcolor: "grey.200" }
          }}
        >

          <RxCross2 size={28} />

        </Box>

        <DialogTitle textAlign={"center"} mb={5}>
          Edit Profile
        </DialogTitle>

        <DialogContent>
          <Stack
            flexDirection={"column"}
            gap={1}
          >

            <Avatar
              src={picture ? URL.createObjectURL(picture) : ""}
              alt="User Avatar"
              sx={{
                width: 96,
                height: 96,
                alignSelf: "center",
              }}
            />

            <Button
              size="large"
              sx={{
                border: "2px solid gray",
                borderRadius: "8px",
                width: 96,
                height: 40,
                alignSelf: "center",
                my: 2,
                ":hover": {
                  cursor: "pointer",
                }
              }}
              onClick={handlePhoto}>
              Change
            </Button>

            <input
              type="file"
              className="file-input"
              accept="image/*"
              ref={imgRef}
              onChange={(e) => setPicture(e.target.files[0])}
            />

            <Typography
              variant="subtitle1"
              fontWeight={"bold"}
              fontSize={"1.2rem"}
              my={2}
            >
              Username
            </Typography>

            <input
              type="text"
              value={"fetchUserName"}
              readOnly
              className="text1"
              style={{ background: DarkMode ? "#2a2a2a" : "#fff", color: textPrimary }}
            />

          </Stack>

          <Stack
            flexDirection={"column"}
            gap={1}
          >

            <Typography
              variant="subtitle1"
              fontWeight={"bold"}
              fontSize={"1.2rem"}
              my={2}
            >
              email
            </Typography>

            <input
              type="text"
              value={"fetchEmail"}
              readOnly
              className="text1"
              style={{ background: DarkMode ? "#2a2a2a" : "#fff", color: textPrimary }}
            />

          </Stack>

          <Stack
            flexDirection={"column"}
            gap={1}
          >

            <Typography
              variant="subtitle1"
              fontWeight={"bold"}
              fontSize={"1.2rem"}
              my={2}
            >
              Bio
            </Typography>

            <input
              type="text"
              placeholder="Write something about yourself..."
              className="text1"
              style={{ background: DarkMode ? "#2a2a2a" : "#fff", color: textPrimary }}
              onChange={(e) => setBio(e.target.value)}
            />

          </Stack>

          <Button
            size="large"
            sx={{
              border: "2px solid gray",
              borderRadius: "8px",
              bgcolor: DarkMode ? "#333" : "GrayText",
              color: "white",
              width: "100%",
              height: 40,
              alignSelf: "center",
              my: 2,
              ":hover": {
                cursor: "pointer",
                bgcolor: DarkMode ? "#444" : "gray",
              }
            }}
            onClick={handleUpdate}
          >
            Update
          </Button>
        </DialogContent>

      </Dialog>
    </>
  )
}

export default EditProfile