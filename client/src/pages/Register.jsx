import { Stack, TextField, Typography, Button, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useSignUpMutation } from '../redux/serviceAPI';

const Register = () => {
  const { DarkMode } = useSelector(state=>state.service);
  const bg = DarkMode ? "#121212" : "#ffffff";
  const cardBg = DarkMode ? "#1e1e1e" : "rgba(255,255,255,0.85)";
  const textPrimary = DarkMode ? "#f5f5f5" : "#000";

  const _700 = useMediaQuery('(max-width:700px)')

  const [signUpUser, signUpUserData ] = useSignUpMutation();

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

  const handleRegister=async ()=>{
    const data ={
      username:username,
      email:email,
      password:password
    }
    console.log("handleRegister called with", data)
    // testing

    await signUpUser(data);
  }

  useEffect(()=>{
    if(signUpUserData.isSuccess){ // testing
      console.log(`User registered successfully : ${signUpUserData.data}`);
    }
  },[signUpUserData.isSuccess])

  return (
    <>
      <Stack
        width={'100%'}
        height={'100vh'}
        flexDirection={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        sx={{
          backgroundColor:bg,
          backgroundImage: DarkMode ? 'none' : 'url("https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          color:textPrimary,
          transition:"background-color .25s,color .25s"
        }}
      >

        <Stack
          flexDirection={'column'}
          width={'30%'}
          gap={2}
          sx={{
            bgcolor: cardBg,
            p:4,
            borderRadius:2,
            backdropFilter: DarkMode ? 'none':'blur(3px)',
            boxShadow: DarkMode ? '0 0 8px #000' : '0 0 12px rgba(0,0,0,0.3)'
          }}
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
              InputProps={{ sx:{ color:textPrimary } }}
              InputLabelProps={{ sx:{ color: DarkMode ? "#bbb":"inherit" } }}
            />

          }
          <TextField
            label="Email"
            variant="outlined"
            placeholder='Enter your Email'
            onChange={(e) => (setEmail(e.target.value))}
            InputProps={{ sx:{ color:textPrimary } }}
            InputLabelProps={{ sx:{ color: DarkMode ? "#bbb":"inherit" } }}
          />
          <TextField
            label="Password"
            variant="outlined"
            placeholder='Enter your Password'
            type='password'
            onChange={(e) => (setPassword(e.target.value))}
            InputProps={{ sx:{ color:textPrimary } }}
            InputLabelProps={{ sx:{ color: DarkMode ? "#bbb":"inherit" } }}
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
