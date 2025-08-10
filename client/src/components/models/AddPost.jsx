import { Avatar, Box, Button, Dialog, DialogContent, DialogTitle, Stack, Typography, useMediaQuery } from "@mui/material"
import { RxCross1 } from "react-icons/rx";
import { PiImages } from "react-icons/pi";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openAddPostModal } from "../../redux/serviceSlice";


const AddPost = () => {

  const _700 = useMediaQuery("(min-width:700px)");

  const [text, setText] = useState("");
  const [media, setMedia] = useState("");

  const mediaRef = useRef();

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(openAddPostModal(false));
  };

  const {AddPostModal, DarkMode} = useSelector(state=>state.service)
  const bg = DarkMode ? "#1e1e1e" : "#ffffff";
  const textPrimary = DarkMode ? "#f5f5f5" : "#000";

  const handleMediaRef = () => {
    mediaRef.current.click();
  };

  const handlePost = () => { }

  return (
    <>
      <Dialog
        open={AddPostModal}
        onClose={handleClose}
        fullWidth
        fullScreen={_700 ? false : true}
        PaperProps={{
          sx:{
            bgcolor:bg,
            color:textPrimary,
            transition:"background-color .25s,color .25s"
          }
        }}
      >

        <Box
          position={"absolute"}
          top={20}
          right={20}
          sx={{
            boxShadow: 3,
            padding: 1,
            ":hover": { cursor: "pointer" }
          }}
        >
          <RxCross1
            size={28}
            className="image-icon"
            onClick={handleClose} 
          />
        </Box>

        <DialogTitle
          textAlign={"center"}
          mb={5}
        >
          New Zip...
        </DialogTitle>

        <DialogContent>
          <Stack
            flexDirection={"row"}
            gap={2}
            mb={5}
          >

            <Avatar src="" alt="" />

            <Stack>

              <Typography
                variant="h6"
                fontWeight={"bold"}
                fontSize={"1rem"}
              >
                Username
              </Typography>

              <textarea
                cols={40}
                rows={5}
                className="text1"
                placeholder="Let's Zip it..."
                autoFocus
                onChange={(e) => setText(e.target.value)}
                style={{
                  background: DarkMode ? "#2a2a2a" : "#fff",
                  color: textPrimary
                }}
              />

              {
                media ?
                  <img
                    src={URL.createObjectURL(media)}
                    alt=""
                    id="url-img"
                  />
                  : null
              }


              <PiImages
                size={28}
                className="image-icon"
                onClick={handleMediaRef}
              />

              <input
                type="file"
                accept="image/*"
                className="file-input"
                ref={mediaRef}
                onChange={(e) => setMedia(e.target.files[0])}
              />

            </Stack>

          </Stack>

          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >

            <Typography
              variant="h6"
              fontSize={"1rem"}
              color="gray"
            >
              Anyone can reply
            </Typography>

            <Button
              size="large"
              sx={{
                bgcolor: DarkMode ? "#333" : "GrayText",
                color: "#fff",
                borderRadius: "10px",
                ":hover": { bgcolor: DarkMode ? "#444" : "grey", cursor: "pointer" },
              }}
              onClick={handlePost}>
              Post
            </Button>

          </Stack>
        </DialogContent>

      </Dialog>
    </>
  )
}

export default AddPost