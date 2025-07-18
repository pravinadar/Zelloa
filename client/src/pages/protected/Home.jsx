import { Stack } from '@mui/material'
import Input from '../../components/Home/Input'
import Post from '../../components/Home/Post'

const Home = () => {
  return (
    <div>
      <Input />
      <Stack
        flexDirection={'column'}
        gap={2}
        mb={10}
        width={"70%"}
        mx={"auto"}
      >

        <Post />

      </Stack>
    </div>
  )
}

export default Home
