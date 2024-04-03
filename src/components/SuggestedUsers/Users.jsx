
import { VStack, Flex,Avatar, Box, Button } from "@chakra-ui/react";
import useAuthStore from "../../store/authStore";
import useFollowUnFollow from "../../hooks/useFollowUnFollow"
import { Link } from "react-router-dom";

const Users = ({ user ,setUser,isSearch}) => {
  const { isFollowing, isUpdating, handleFollowUnFollowUser } = useFollowUnFollow(user.uid);
  const authUser = useAuthStore((state) => state.user)


  const onFollowUser = async () => {
    await handleFollowUnFollowUser();
    

    // need this code , please check
    if(isSearch){
      // console.log("isSearch");
      setUser({
        ...user,
        followers: isFollowing
          ? user.followers.filter((follower) => follower.uid !== authUser.uid)
          : [...user.followers, authUser],
      });

    }
	};
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Link to={`/${user.username}`}>
          <Avatar src={user.profilePicURL} size={"md"} />
        </Link>
        <VStack spacing={2} alignItems={"flex-start"}>
          <Link to={`/${user.username}`}>
            <Box fontSize={12} fontWeight={"bold"}>
              {user.fullName}
            </Box>
          </Link>
          <Box fontSize={11} color={"gray.500"}>
          followers {user.followers.length}  following {user.following.length} 
          </Box>
        </VStack>
      </Flex>

      {/* If I am searching my own id , in search modal than dont show follow button. For others show it */}
      {authUser.uid !== user.uid && (
              <Button fontSize={13}
              bg={"transparent"}
              p={0}
              h={"max-content"}
              fontWeight={"medium"}
              color={"blue.400"}
              cursor={"pointer"}
              _hover={{ color: "white" }}
              
              onClick={onFollowUser}
              isLoading={isUpdating} 
              >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
      )}
    </Flex>
  );
};

export default Users;
