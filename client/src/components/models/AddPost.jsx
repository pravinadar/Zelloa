import { Avatar, Box, Button, Dialog, DialogContent, DialogTitle, Stack, Typography, useMediaQuery } from "@mui/material"
import { RxCross1 } from "react-icons/rx";
import { PiImages } from "react-icons/pi";
import { useRef, useState } from "react";


const AddPost = () => {

  const _700 = useMediaQuery("(min-width:700px)");

  const [text, setText] = useState("");
  const [media, setMedia] = useState("");

  const mediaRef = useRef();

  const handleClose = () => { };

  const handleMediaRef = () => {
    mediaRef.current.click();
  };

  const handlePost = () => {}

  return (
    <>
      <Dialog
        open={true}
        onClose={handleClose}
        fullWidth
        fullScreen={_700 ? false : true}
      >

        <Box
          position={"absolute"}
          top={20}
          right={20}
          onClick={handleClose}
        >
          <RxCross1 size={28} className="image-icon" />
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
                bgcolor: "GrayText",
                color: "white",
                borderRadius: "10px",
                ":hover": { bgcolor: "grey", cursor: "pointer" },
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