import { Stack, TextField, Typography, Button, useMediaQuery, Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLoginMutation, useSignUpMutation } from '../redux/serviceAPI';

const Register = () => {
  const { DarkMode } = useSelector(state => state.service);
  const bg = DarkMode 
    ? "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)" 
    : "linear-gradient(135deg, #ffffff 0%, #f8f9fa 25%, #e9ecef 50%, #f8f9fa 75%, #ffffff 100%)";
  const cardBg = DarkMode ? "rgba(26, 26, 26, 0.9)" : "rgba(255, 255, 255, 0.95)";
  const textPrimary = DarkMode ? "#ffffff" : "#000000";
  const borderColor = DarkMode ? "#333333" : "#e0e0e0";

  const _700 = useMediaQuery('(max-width:700px)')

  const [signUpUser, signUpUserData] = useSignUpMutation();
  const [loginUser, loginUserData] = useLoginMutation();

  const [login, setLogin] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const toggleLogin = () => {
    setLogin(!login)
  }

  const handleLogin = async () => {

    const data = {
      email: email,
      password: password
    }
    console.log("handleLogin called with", data)
    // testing

    await loginUser(data);
  }

  const handleRegister = async () => {
    const data = {
      username: username,
      email: email,
      password: password
    }
    console.log("handleRegister called with", data)
    // testing

    await signUpUser(data);
  }

  useEffect(() => {
    if (signUpUserData.isSuccess) { // testing
      console.log(`User registered successfully : ${signUpUserData.data}`);
      setLogin(true);
    }
    if (loginUserData.isSuccess) { // testing
      console.log(`User logged in successfully : ${loginUserData.data}`);
    }
  }, [signUpUserData.isSuccess, loginUserData.isSuccess])

  return (
    <>
      <Stack
        width={'100%'}
        height={'100vh'}
        sx={{
          background: bg,
          color: textPrimary,
          transition: "all .3s ease",
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: DarkMode 
              ? 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.03) 0%, transparent 50%)'
              : 'radial-gradient(circle at 20% 80%, rgba(0,0,0,0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0,0,0,0.05) 0%, transparent 50%)',
            pointerEvents: 'none',
            zIndex: 1
          }
        }}
      >
        {/* Header with Logo and Brand Name */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: 3,
            borderBottom: `1px solid ${borderColor}`,
            gap: 2,
            position: 'relative',
            zIndex: 2,
            backdropFilter: 'blur(10px)',
            backgroundColor: DarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)'
          }}
        >
          <img 
            src={DarkMode ? "/logo-darkmode.svg" : "/logo-lightmode.svg"} 
            alt="Zelloa Logo" 
            style={{ height: '40px', width: '40px' }}
          />
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 'bold',
              color: textPrimary,
              fontSize: '2rem'
            }}
          >
            Zelloa
          </Typography>
        </Box>

        {/* Main Content */}
        <Stack
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          flex={1}
          px={2}
          sx={{ position: 'relative', zIndex: 2 }}
        >
          <Stack
            flexDirection={'column'}
            width={_700 ? '90%' : '400px'}
            maxWidth={'400px'}
            gap={3}
            sx={{
              bgcolor: cardBg,
              p: 4,
              borderRadius: 3,
              border: `1px solid ${borderColor}`,
              boxShadow: DarkMode 
                ? '0 20px 40px rgba(255,255,255,0.1), 0 8px 16px rgba(255,255,255,0.05)' 
                : '0 20px 40px rgba(0,0,0,0.15), 0 8px 16px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(20px)',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 3,
                background: DarkMode
                  ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)'
                  : 'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.01) 50%, rgba(0,0,0,0.02) 100%)',
                pointerEvents: 'none',
                zIndex: -1
              }
            }}
          >

          <Typography
            variant="h5"
            fontSize={"1.5rem"}
            fontWeight={"bold"}
            alignSelf={"center"}
            sx={{ mb: 2 }}
          >
            {login ? "Welcome Back" : "Create Account"}
          </Typography>

          {login ? null :
            <TextField
              label="Username"
              variant="outlined"
              placeholder='Enter your username'
              onChange={(e) => (setUsername(e.target.value))}
              InputProps={{ 
                sx: { 
                  color: textPrimary,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: borderColor,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: textPrimary,
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: textPrimary,
                  }
                } 
              }}
              InputLabelProps={{ sx: { color: DarkMode ? "#bbb" : "#666" } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: borderColor,
                  },
                  '&:hover fieldset': {
                    borderColor: textPrimary,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: textPrimary,
                  },
                },
              }}
            />
          }
          
          <TextField
            label="Email"
            variant="outlined"
            placeholder='Enter your Email'
            onChange={(e) => (setEmail(e.target.value))}
            InputProps={{ 
              sx: { 
                color: textPrimary,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: borderColor,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: textPrimary,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: textPrimary,
                }
              } 
            }}
            InputLabelProps={{ sx: { color: DarkMode ? "#bbb" : "#666" } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: borderColor,
                },
                '&:hover fieldset': {
                  borderColor: textPrimary,
                },
                '&.Mui-focused fieldset': {
                  borderColor: textPrimary,
                },
              },
            }}
          />
          
          <TextField
            label="Password"
            variant="outlined"
            placeholder='Enter your Password'
            type='password'
            onChange={(e) => (setPassword(e.target.value))}
            InputProps={{ 
              sx: { 
                color: textPrimary,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: borderColor,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: textPrimary,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: textPrimary,
                }
              } 
            }}
            InputLabelProps={{ sx: { color: DarkMode ? "#bbb" : "#666" } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: borderColor,
                },
                '&:hover fieldset': {
                  borderColor: textPrimary,
                },
                '&.Mui-focused fieldset': {
                  borderColor: textPrimary,
                },
              },
            }}
          />

          <Button
            size="large"
            sx={{
              width: "100%",
              height: 52,
              bgcolor: DarkMode ? "#ffffff" : "#000000",
              color: DarkMode ? "#000000" : "#ffffff",
              fontSize: "1rem",
              fontWeight: "600",
              mt: 1,
              ":hover": {
                bgcolor: DarkMode ? "#e0e0e0" : "#333333"
              }
            }}
            onClick={login ? handleLogin : handleRegister}>
            {login ? "Sign In" : "Create Account"}
          </Button>

          <Typography
            variant="subtitle2"
            fontSize={"0.9rem"}
            alignSelf={"center"}
            sx={{ mt: 2 }}
          >
            {login ? "Don't have an account? " : "Already have an account? "}
            <span 
              className='login-link' 
              onClick={toggleLogin}
              style={{
                color: DarkMode ? "#ffffff" : "#000000",
                cursor: "pointer",
                textDecoration: "underline",
                fontWeight: "600"
              }}
            >
              {login ? "Sign Up" : "Sign In"}
            </span>
          </Typography>

        </Stack>
      </Stack>
    </Stack>
    </>
  )
}

export default Register
