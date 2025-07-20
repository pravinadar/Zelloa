import { Button, Stack, useMediaQuery } from '@mui/material'
import Input from '../../components/Home/Input'
import Post from '../../components/Home/Post'

const Home = () => {

  const _700 = useMediaQuery('(min-width:700px)')

  return (
    <div>
      <Input />
      <Stack
        flexDirection={'column'}
        gap={2}
        mb={10}
        maxWidth={_700? '70%' : '80%'}
        mx={"auto"}
      >

        <Post />
        <Post />
        <Post />

        <Button
          size='large'
          sx={{
            p: 3,
            textDecoration: "underline",
            color: "black",
            cursor: "pointer",
          }}>

          Load More

        </Button>

      </Stack>

    </div>
  )
}

export default Home
