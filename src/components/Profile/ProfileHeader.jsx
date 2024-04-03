import {
  Avatar,
  AvatarGroup,
  Flex,
  VStack,
  Button,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername ";
import useAuthStore from "../../store/authStore";
import EditProfile from "../Profile/EditProfile"
import useFollowUnFollow from "../../hooks/useFollowUnFollow";

const ProfileHeader = () => {
  // const [isFollowing, setIsFollowing] = useState(false);
  const { userProfile } = useGetUserProfileByUsername();
  const { isOpen, onOpen, onClose } = useDisclosure()

  // get the authenticated user
  const authUser = useAuthStore((state) => state.user);

  const visitingOwnProfile =
    authUser && authUser.username === userProfile.username;

  const visitingAnotherProfile =
    authUser && authUser.username !== userProfile.username;

    // Pass current user Profile uid
    const { isUpdating, isFollowing, handleFollowUnFollowUser } = useFollowUnFollow(userProfile?.uid)


  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: "column", sm: "row" }}
    >
      <AvatarGroup
        size={{ base: "xl", md: "2xl" }}
        justifySelf={"center"}
        alignSelf={"flex-start"}
        mx={"auto"}
      >
        <Avatar src={userProfile.profilePicURL} alt="As a programmer logo" />
      </AvatarGroup>
      <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
        <Flex
          gap={4}
          direction={{ base: "column", sm: "row" }}
          justifyContent={{ base: "center", sm: "flex-start" }}
          alignItems={"center"}
          w={"full"}
        >
          <Text fontSize={{ base: "sm", md: "lg" }}>
            {userProfile.username}
          </Text>
        </Flex>
        {/* If it is own profile than show edit button or else show folloe button */}
        {visitingOwnProfile && (
          <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
            <Button
              bg={"white"}
              color={"black"}
              _hover={{ bg: "whiteAlpha.800" }}
              size={{ base: "xs", md: "sm" }}
              onClick={onOpen}
            >
              Edit Profile
            </Button>
          </Flex>
        )}
        {visitingAnotherProfile && (
          <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
            <Button
              bg={"blue.500"}
              color={"white"}
              _hover={{ bg: "blue.600" }}
              size={{ base: "xs", md: "sm" }}
              onClick={handleFollowUnFollowUser}
              isLoading={isUpdating}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
          </Flex>
        )}

        <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as="span" fontWeight={"bold"} mr={1}>
              {userProfile.posts.length}
            </Text>
            Posts
          </Text>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as="span" fontWeight={"bold"} mr={1}>
              {userProfile.followers.length}
            </Text>
            Followers
          </Text>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as="span" fontWeight={"bold"} mr={1}>
              {userProfile.following.length}
            </Text>
            Following
          </Text>
        </Flex>
        <Flex alignItems={"center"} gap={4}>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            {userProfile.fullName}
          </Text>
        </Flex>
        <Text fontSize={"sm"}>{userProfile.bio}</Text>
      </VStack>
      {isOpen && <EditProfile isOpen={isOpen} onClose={onClose}/>}
    </Flex>
  );
};

export default ProfileHeader;
