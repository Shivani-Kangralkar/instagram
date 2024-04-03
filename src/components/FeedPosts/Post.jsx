import { Box, Image } from "@chakra-ui/react";
import React from "react";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import useGetUserProfileById from "../../hooks/useGetUserProfileById"

const Post = ({post}) => {
  const { userProfile } = useGetUserProfileById(post.createdBy);

  return (
    <>
      <PostHeader post={post} creatorProfile={userProfile}/>
      <Box my={2} borderRadius={4} overflow={"hidden"}>
        <Image src={post.imageURL} alt={post.imageURL}/>
      </Box>
      <PostFooter creatorProfile={userProfile} post={post}/>
    </>
  );
};

export default Post;
