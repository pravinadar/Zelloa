import { Button, Stack, useMediaQuery } from '@mui/material'
import Input from '../../components/Home/Input'
import Post from '../../components/Home/Post'
import { useSelector } from 'react-redux'

const Home = () => {
  const _700 = useMediaQuery('(min-width:700px)')
  const { DarkMode } = useSelector(state => state.service);
  const textSecondary = DarkMode ? "#bbb" : "black"

  return (
    <div>
      <Input />
      <Stack
        flexDirection={'column'}
        gap={2}
        mb={10}
        maxWidth={_700 ? '70%' : '80%'}
        mx={"auto"}
        sx={{ transition: "color .25s", color: textSecondary }}
      >

        <Post />
        <Post />
        <Post />

        <Button
          size='large'
          sx={{
            p: 3,
            textDecoration: "underline",
            color: textSecondary,
            cursor: "pointer",
          }}>

          Load More

        </Button>

      </Stack>

    </div>
  )
}

export default Home
