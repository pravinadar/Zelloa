import { Avatar, AvatarGroup, Badge, Stack, Stepper } from '@mui/material'

const PostHeader = ({ isMobile }) => {
    return (
        <>
            <Stack
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"space-between"}
                width={{ xs: "50px", sm: "60px" }}
                minWidth={{ xs: "50px", sm: "60px" }}
            >

                <Badge
                    overlap="circular"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    badgeContent={
                        <Avatar alt="+" src="" sx={{
                            width: isMobile ? 16 : 20,
                            height: isMobile ? 16 : 20,
                            bgcolor: "green",
                            position: "relative",
                            right: isMobile ? 2 : 4,
                            bottom: isMobile ? 2 : 4,
                            fontSize: isMobile ? "0.6rem" : "0.8rem"
                        }}
                        >
                            {" "}+{" "}
                        </Avatar>
                    }
                >
                    <Avatar 
                        alt="User" 
                        src="" 
                        sx={{ 
                            width: isMobile ? 32 : 40, 
                            height: isMobile ? 32 : 40 
                        }} 
                    />
                </Badge>

                <Stack
                    flexDirection={"column"}
                    alignItems={"center"}
                    gap={isMobile ? 1 : 2}
                    height={"100%"}
                >
                    <Stepper
                        orientation='vertical'
                        activeStep={0}
                        sx={{
                            border: "0.1rem solid gray",
                            width: "0px",
                            height: "100%",
                        }}
                    >
                    </Stepper>

                    <AvatarGroup total={3} sx={{
                        '& .MuiAvatar-root': {
                            width: isMobile ? 20 : 24,
                            height: isMobile ? 20 : 24,
                            fontSize: isMobile ? 10 : 12,
                        }
                    }}>
                        <Avatar alt="User1" src="" />
                    </AvatarGroup>
                </Stack>

            </Stack>
        </>
    )
}

export default PostHeader