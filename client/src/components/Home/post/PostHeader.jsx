import { Avatar, AvatarGroup, Badge, Stack, Stepper } from '@mui/material'

const PostHeader = ({ isMobile }) => {
    return (
        <>
            <Stack
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"space-between"}
                width={{ xs: "45px", sm: "60px" }}
                minWidth={{ xs: "45px", sm: "60px" }}
            >

                <Badge
                    overlap="circular"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    badgeContent={
                        <Avatar alt="+" src="" sx={{
                            width: isMobile ? 14 : 20,
                            height: isMobile ? 14 : 20,
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
                            width: isMobile ? 30 : 40, 
                            height: isMobile ? 30 : 40 
                        }} 
                    />
                </Badge>

                <Stack
                    flexDirection={"column"}
                    alignItems={"center"}
                    gap={isMobile ? 0.5 : 1.5}
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
                            width: isMobile ? 18 : 24,
                            height: isMobile ? 18 : 24,
                            fontSize: isMobile ? 9 : 12,
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