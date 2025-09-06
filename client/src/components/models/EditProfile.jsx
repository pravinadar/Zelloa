import { Avatar, Box, Button, Dialog, DialogContent, DialogTitle, Input, Stack, Typography, useMediaQuery } from "@mui/material"
import { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { openEditProfileModal } from "../../redux/serviceSlice.js";
import { useParams } from "react-router-dom";
import { useUpdateProfileMutation, useUserDetailsQuery } from "../../redux/serviceAPI.js";

const EditProfile = () => {

  const _700 = useMediaQuery("(min-width:700px)");

  const [picture, setPicture] = useState()
  const [bio, setBio] = useState("")

  const imgRef = useRef()

  const { EditProfileModal, DarkMode, myInfo } = useSelector(state => state.service)
  const bg = DarkMode ? "#1e1e1e" : "#ffffff";
  const textPrimary = DarkMode ? "#f5f5f5" : "#000";

  const dispatch = useDispatch();
  const params = useParams();

  const [updateProfile, updateProfileData] = useUpdateProfileMutation();
  const {refetch} = useUserDetailsQuery(params?.id);

  const handleClose = () => {
    dispatch(openEditProfileModal(false));
  }

  const handlePhoto = () => {
    imgRef.current.click();
  }

  const handleUpdate = async() => {
    if (!picture && !bio) return;
    const formData = new FormData();
    if (picture) {
      formData.append("profilePicture", picture);
    }
    if (bio) {
      formData.append("bio", bio);
    }
    handleClose();
    await updateProfile(formData);
  }

  useEffect(() => {
    if (updateProfileData?.isSuccess) {
      console.log("Profile Updated Successfully : ", updateProfileData?.data);
      setPicture();
      setBio("");
      refetch();
    }
    if (updateProfileData?.isError) {
      console.log("Error in updating Profile : ", updateProfileData?.error?.data?.message);
    }
  },[updateProfileData?.isSuccess, updateProfileData?.isError])

  return (
    <>
      <Dialog
        open={EditProfileModal}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        fullScreen={_700 ? false : true}
        PaperProps={{
          sx: {
            bgcolor: bg,
            color: textPrimary,
            transition: "background-color .25s,color .25s",
            borderRadius: _700 ? 3 : 0,
            minHeight: _700 ? "auto" : "100vh"
          }
        }}
      >

        <Box
          position={"absolute"}
          top={16}
          right={16}
          onClick={handleClose}
          sx={{
            padding: 1.5,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
            ":hover": { 
              cursor: "pointer", 
              bgcolor: DarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
              transform: "scale(1.1)"
            }
          }}
        >

          <RxCross2 size={24} />

        </Box>

        <DialogTitle 
          textAlign={"center"} 
          sx={{ 
            pb: 1, 
            pt: 3,
            fontSize: "1.5rem",
            fontWeight: "600"
          }}
        >
          Edit Profile
        </DialogTitle>

        <DialogContent sx={{ px: 3, pb: 3 }}>
          <Stack
            flexDirection={"column"}
            gap={2}
            alignItems={"center"}
            mb={3}
          >

            <Avatar
              src={picture ? URL.createObjectURL(picture) : myInfo?.profilePicture}
              alt="User Avatar"
              sx={{
                width: 120,
                height: 120,
                border: `3px solid ${DarkMode ? "#333" : "#e0e0e0"}`,
                boxShadow: DarkMode 
                  ? "0 4px 20px rgba(255,255,255,0.1)" 
                  : "0 4px 20px rgba(0,0,0,0.15)"
              }}
            />

            <Button
              variant="outlined"
              size="medium"
              sx={{
                borderColor: DarkMode ? "#555" : "#ddd",
                color: textPrimary,
                borderRadius: "20px",
                px: 3,
                py: 1,
                mt: 1,
                textTransform: "none",
                fontWeight: "500",
                transition: "all 0.2s ease",
                ":hover": {
                  borderColor: DarkMode ? "#777" : "#bbb",
                  bgcolor: DarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
                  transform: "translateY(-1px)"
                }
              }}
              onClick={handlePhoto}>
              Change Photo
            </Button>

            <input
              type="file"
              className="file-input"
              accept="image/*"
              ref={imgRef}
              onChange={(e) => setPicture(e.target.files[0])}
              style={{ display: "none" }}
            />

          </Stack>

          <Stack spacing={3} mt={2}>
            <Box>
              <Typography
                variant="body1"
                fontWeight={"600"}
                fontSize={"0.95rem"}
                mb={1.5}
                color={DarkMode ? "#ccc" : "#555"}
              >
                Username
              </Typography>

              <input
                type="text"
                value={myInfo?.username}
                readOnly
                className="text1"
                style={{ 
                  background: DarkMode ? "#2a2a2a" : "#f8f9fa", 
                  color: textPrimary,
                  border: `1px solid ${DarkMode ? "#404040" : "#e0e0e0"}`,
                  borderRadius: "8px",
                  padding: "12px 16px",
                  width: "100%",
                  fontSize: "14px",
                  outline: "none",
                  opacity: 0.7,
                  boxSizing: "border-box"
                }}
              />
            </Box>

            <Box>
              <Typography
                variant="body1"
                fontWeight={"600"}
                fontSize={"0.95rem"}
                mb={1.5}
                color={DarkMode ? "#ccc" : "#555"}
              >
                Email
              </Typography>

              <input
                type="text"
                value={myInfo?.email}
                readOnly
                className="text1"
                style={{ 
                  background: DarkMode ? "#2a2a2a" : "#f8f9fa", 
                  color: textPrimary,
                  border: `1px solid ${DarkMode ? "#404040" : "#e0e0e0"}`,
                  borderRadius: "8px",
                  padding: "12px 16px",
                  width: "100%",
                  fontSize: "14px",
                  outline: "none",
                  opacity: 0.7,
                  boxSizing: "border-box"
                }}
              />
            </Box>

            <Box>
              <Typography
                variant="body1"
                fontWeight={"600"}
                fontSize={"0.95rem"}
                mb={1.5}
                color={DarkMode ? "#ccc" : "#555"}
              >
                Bio
              </Typography>

              <input
                type="text"
                placeholder={myInfo?.bio || "Write something about yourself..."}
                className="text1"
                style={{ 
                  background: DarkMode ? "#2a2a2a" : "#fff", 
                  color: textPrimary,
                  border: `1px solid ${DarkMode ? "#404040" : "#e0e0e0"}`,
                  borderRadius: "8px",
                  padding: "12px 16px",
                  width: "100%",
                  fontSize: "14px",
                  outline: "none",
                  transition: "border-color 0.2s ease",
                  boxSizing: "border-box"
                }}
                onChange={(e) => setBio(e.target.value)}
                onFocus={(e) => e.target.style.borderColor = DarkMode ? "#666" : "#1976d2"}
                onBlur={(e) => e.target.style.borderColor = DarkMode ? "#404040" : "#e0e0e0"}
              />
            </Box>

          </Stack>

          <Button
            variant="contained"
            size="large"
            sx={{
              borderRadius: "12px",
              bgcolor: DarkMode ? "#1976d2" : "#1976d2",
              color: "white",
              width: "100%",
              height: 48,
              mt: 4,
              mb: 2,
              textTransform: "none",
              fontSize: "16px",
              fontWeight: "600",
              boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
              transition: "all 0.2s ease",
              ":hover": {
                bgcolor: DarkMode ? "#1565c0" : "#1565c0",
                boxShadow: "0 6px 16px rgba(25, 118, 210, 0.4)",
                transform: "translateY(-2px)"
              },
              ":disabled": {
                bgcolor: DarkMode ? "#333" : "#ccc",
                color: DarkMode ? "#666" : "#999",
                boxShadow: "none"
              }
            }}
            onClick={handleUpdate}
            disabled={!picture && !bio}
          >
            Update Profile
          </Button>
        </DialogContent>

      </Dialog>
    </>
  )
}

export default EditProfile