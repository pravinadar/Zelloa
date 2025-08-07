import { Box, Grid, Stack, Typography, useMediaQuery } from '@mui/material'
import { ImMenu } from "react-icons/im";


import Navbar from './Navbar'
import { IoMenu } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { openMainMenu } from '../../redux/serviceSlice';


const Header = () => {

  const _700 = useMediaQuery('(min-width:700px)')

  const dispatch = useDispatch();

  const { MainMenu } = useSelector(state => state.service)

  const handleMenuToggle = (event) => {
    dispatch(openMainMenu(event.currentTarget));
  }

  return (
    <>
      {_700 ?
        (<Stack
          flexDirection={'row'}
          justifyContent={'space-around'}
          alignItems={'center'}
          position={'sticky'}
          height={52}
          top={0}
          py={1}
        >

          <img src="/logo-lightmode2.svg" alt="logo" width={60} height={48} />

          <Stack
            justifyContent={'center'}
            width={'550px'}
            zIndex={2}
            height={96}
            bgcolor={'aliceblue'}
          >
            <Navbar />
          </Stack>

          <Box
            sx={{
              ":hover": { cursor: "pointer"},
            }}>
            <ImMenu
              size={32}
              className='image-icon'
              onClick={handleMenuToggle}
            />
          </Box>

        </Stack>)

        :

        (
          <>
            <Stack
              position={"fixed"}
              bottom={0}
              justifyContent={"center"}
              width={"100%"}
              height={52}
              p={1}
              bgcolor={"aliceblue"}
              zIndex={2}
            >
              <Navbar />
            </Stack>

            <Grid
              container
              height={60}
              justifyContent={"space-between"}
              alignItems={"center"}
              p={1}>

              <Grid>

                <img
                  src="/logo-lightmode2.svg"
                  alt="logo"
                  width={60}
                  height={48}
                />

              </Grid>

              <Typography
                variant="h6"
                component="h1"
                fontWeight="bold"
                color="black"
                sx={{
                  fontFamily: 'Roboto, Arial, sans-serif',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  fontSize: '1.5rem',
                }}
              >
                Zelloa
              </Typography>

              <Box
                sx={{
                  ":hover": { cursor: "pointer", bgcolor: "grey.200" },
                }}>
                <IoMenu
                  size={32}
                  className='image-icon'
                  onClick={handleMenuToggle}
                />
              </Box>

            </Grid>

          </>
        )
      }


    </>
  )
}

export default Header
