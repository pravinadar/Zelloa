import { Stack, TextField, Typography, Button } from '@mui/material'
import { useState } from 'react'

const Register = () => {

  const [login, setLogin] = useState(false)

  return (
    <>
      <Stack
        width={'100%'}
        height={'100vh'}
        flexDirection={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        sx={{
          backgroundImage: 'url("https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >

        <Stack
          flexDirection={'column'}
          width={'30%'}
          gap={2}
        >

          <Typography
            variant="h5"
            fontSize={"1.5rem"}
            fontWeight={"bold"}
            alignSelf={"center"}
          >
            Register

          </Typography>

          <TextField
            label="Username"
            variant="outlined"
            placeholder='Enter your username'
          />
          <TextField
            label="Email"
            variant="outlined"
            placeholder='Enter your Email'
          />
          <TextField
            label="Password"
            variant="outlined"
            placeholder='Enter your Password'
          />

          <Button
          size="large"
          sx={{
            width: "100%",
            height:52,
            bgcolor: "black",
            color: "white",
            fontSize: "1rem",
            ":hover":{
              bgcolor: "gray"
            }
          }}>
            Register
          </Button>

          <Typography
          variant="subtitle2"
          fontSize={"1.3rem"}
          alignSelf={"center"}
          >
            Already have an account? <span className='login-link'>Login</span>
          </Typography>

        </Stack>

      </Stack>
    </>
  )
}

export default Register
