import { Stack, TextField, Typography, Button, useMediaQuery } from '@mui/material'
import { useState } from 'react'

const Register = () => {

  const _700 = useMediaQuery('(max-width:700px)')

  const [login, setLogin] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const toggleLogin = () => {
    setLogin(!login)
  }

  const handleLogin=()=>{

    const data ={
      email:email,
      password:password
    }
    console.log("handleLogin called with", data)
    // testing
  }

  const handleRegister=()=>{
    const data ={
      username:username,
      email:email,
      password:password
    }
    console.log("handleRegister called with", data)
    // testing
  }

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
            {login ? "Login" : "Register"}

          </Typography>

          {login ? null :

            <TextField
              label="Username"
              variant="outlined"
              placeholder='Enter your username'
              onChange={(e) => (setUsername(e.target.value))}
            />

          }
          <TextField
            label="Email"
            variant="outlined"
            placeholder='Enter your Email'
            onChange={(e) => (setEmail(e.target.value))}
          />
          <TextField
            label="Password"
            variant="outlined"
            placeholder='Enter your Password'
            type='password'
            onChange={(e) => (setPassword(e.target.value))}
          />

          <Button
            size="large"
            sx={{
              width: "100%",
              height: 52,
              bgcolor: "black",
              color: "white",
              fontSize: "1rem",
              ":hover": {
                bgcolor: "gray"
              }
            }}
            onClick={login ? handleLogin : handleRegister}>
            {login ? "Login" : "Register"}
          </Button>

          <Typography
            variant="subtitle2"
            fontSize={"1.3rem"}
            alignSelf={"center"}
          >

            {login ? "Don't have an account? " : "Already have an account? "}
            <span className='login-link' onClick={toggleLogin}>
              {login ? "Register" : "Login"}
            </span>

          </Typography>

        </Stack>

      </Stack>
    </>
  )
}

export default Register
