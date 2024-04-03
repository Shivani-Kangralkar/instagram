import { Container,Flex,Box } from '@chakra-ui/react'
import React from 'react'
import FeedPost from '../../components/FeedPosts/FeedPost'
import SuggestedUsers from '../../components/SuggestedUsers/SuggestedUsers'

const HomePage = () => {
  return (
   <Container maxW={"container.lg"}>
    <Flex gap={20}>
        <Box flex={2} py={10}>
            <FeedPost/>
        </Box>
        <Box flex={3}  maxW={"300px"} display={{ base: "none", lg: "block" }} >
            <SuggestedUsers />
        </Box>
    </Flex>
   </Container>
  )
}

export default HomePage
