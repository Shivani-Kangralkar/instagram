import { Grid,Flex,Text, VStack, Skeleton, Box } from "@chakra-ui/react";
import Post from "../../components/Profile/Post";
import useGetUserPost from "../../hooks/useGetUserPost";

const ProfilePosts = () => {
  const { isLoading, posts } = useGetUserPost();
  const noPostsFound = !isLoading && posts.length === 0;
  if(noPostsFound) return <NoPostsFound />


  return (
    <>
      <Grid
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(3, 1fr)",
        }}
        gap={1}
        columnGap={1}
      >
        {/* load only 3 skeleton while loading */}
        {isLoading &&
          [0, 1, 2, 3].map((_, idx) => (
            <VStack key={idx} alignItems={"flex-start"} gap={4}>
              <Skeleton w={"full"}>
                <Box h="300px">contents wrapped</Box>
              </Skeleton>
            </VStack>
          ))}

        {!isLoading && (
          <>
            {
              posts.map((post) => (
                <Post post={post} key={post.id}/>
              ))
            }
          </>
        )}
      </Grid>
    </>
  );
};

export default ProfilePosts;

const NoPostsFound = () => {
	return (
		<Flex flexDir='column' textAlign={"center"} mx={"auto"} mt={10}>
			<Text fontSize={"2xl"}>No Posts Found🤔</Text>
		</Flex>
	);
}
