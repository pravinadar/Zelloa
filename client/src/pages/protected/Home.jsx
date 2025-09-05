import { Button, Stack, Typography, useMediaQuery } from '@mui/material'
import Input from '../../components/Home/Input'
import Post from '../../components/Home/Post'
import Loading from '../../components/common/Loading.jsx'
import { useSelector } from 'react-redux'
import { useAllPostQuery } from '../../redux/serviceAPI'
import { useEffect, useState } from 'react'

const Home = () => {
  const _700 = useMediaQuery('(min-width:700px)')
  const { DarkMode } = useSelector(state => state.service);
  const textSecondary = DarkMode ? "#bbb" : "black"

  const [page, setPage] = useState(1)
  const [showLoadButton, setShowLoadButton] = useState(true)
  const { allPosts } = useSelector(state => state.service)

  const { data, isLoading } = useAllPostQuery(page);
  // console.log(data)

  const handleLoadMore = () => {
    setPage(prev => prev + 1)
  };

  useEffect(() => {
    if(data && data.posts.length===0){
      setShowLoadButton(false)
    }
  },[data])

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

        {
          allPosts ?
            allPosts.length > 0 ?
              allPosts.map((post) => {
                return <Post key={post._id} post={post} />
              }) :
              <Typography textAlign={'center'} mt={5} fontSize={20}>
                No Posts Yet
              </Typography>
            : isLoading ? <Loading /> : null
        }

        {
          showLoadButton ? (

            <Button
              size='large'
              sx={{
                p: 3,
                textDecoration: "underline",
                color: textSecondary,
                cursor: "pointer",
              }}
              onClick={handleLoadMore}>

              Load More

            </Button>
          ) : (
            <Typography textAlign={'center'} mt={5} fontSize={20}>
              You have seen it all!
            </Typography>
          )
        }

      </Stack>

    </div>
  )
}

export default Home
