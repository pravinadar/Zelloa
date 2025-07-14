import {CircularProgress, Stack} from '@mui/material' 

const Loading = () => {
  return (
    <Stack
     flexDirection={'row'}
     justifyContent={'center'}
     alignItems={'center'}
     minHeight={'50vh'}
     width={'100%'}
     height={'100%'}
    >
      <CircularProgress/>
    </Stack>
  )
}

export default Loading
