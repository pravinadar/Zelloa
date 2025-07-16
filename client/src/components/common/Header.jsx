import { Stack } from '@mui/material'
import { ImMenu } from "react-icons/im";


import Navbar from './Navbar'


const Header = () => {
  return (
    <>
      <Stack
        flexDirection={'row'}
        justifyContent={'space-around'}
        alignItems={'center'}
        position={'sticky'}
        height={52}
        top={0}
        py={1}
      >

        <img src="/logo-lightmode.svg" alt="logo" width={60} height={48} />

        <Stack
          justifyContent={'center'}
          width={'550px'}
          zIndex={2}
          height={96}
          bgcolor={'aliceblue'}
        >
          <Navbar />
        </Stack>

        <ImMenu size={32} className='image-icon' />
      </Stack>
    </>
  )
}

export default Header
