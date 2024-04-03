import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { firestore } from "../firebase/firebase";
import { arrayRemove, arrayUnion, updateDoc, doc } from "firebase/firestore";
import useUserProfileStore from "../store/userProfileStore";

// 1) shivani -----> pratiksha (following)
// shivani ----> follower() following(1)
// pratiksha ----> follower(1) following()
// 2) shivani -----> pratiksha (unfollowing)
// shivani ----> follower() following(0)
// pratiksha ----> follower(0) following()

// example userId is pratiksha
const useFollowUnFollow = (userId) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);


  const { userProfile, setUserProfile } = useUserProfileStore();

  const showToast = useShowToast();

  // console.log('shivani userProfile', userProfile.followers);
  // console.log('akshay userId', userId);


  const handleFollowUnFollowUser = async () => {
    console.log("isFollowing", isFollowing);
    setIsUpdating(true);
    try {
      // Auth userId (shivani)
      const currentUserRef = doc(firestore, "users", authUser?.uid);

      // Pratiksha
      const userToFollowOrUnfollow = doc(firestore, "users", userId);
      await updateDoc(currentUserRef, {
        // If shivani is following pratiksha , remove her userId to unfollow, if not following than add her
        following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
      });

      // Here you are updating followers array of pratiksha , basically follow and unfollow (if following her than unfollow her , if unfollow than follow her)
      await updateDoc(userToFollowOrUnfollow, {
        followers: isFollowing
          ? arrayRemove(authUser.uid)
          : arrayUnion(authUser.uid),
      });

      // If I am already following pratiksha user than remove her from both array(following,followers)
      if (isFollowing) {
        // unFollow
        // remove pratiksha from shivani following array
        // uid (shivani) !== userId (pratiksha) remove pratiksha from shivani following array to unfollow pratiksha
        // shivani --- > following ( pratiksha userId gets removed from shivani following)

        console.log("inside");
        setAuthUser({
          ...authUser,
          following: authUser.following.filter((uid) => uid !== userId),
        });

        // from pratiksha ---> follower it gets removed shivani authUser.uid

        if (userProfile)
          setUserProfile({
            ...userProfile,
            followers: userProfile.followers.filter((uid) => uid !== authUser.uid),
          });

        localStorage.setItem(
          "user-info",
          JSON.stringify({
            ...authUser,
            following: authUser.following.filter((uid) => uid !== userId),
          })
        );

        setIsFollowing(false);
      } else {
        // follow
        // Shivani wants to follow pratiksha than just add userId(pratiksha) into previous authUser array
        setAuthUser({
          ...authUser,
          following: [...authUser.following, userId],
        });

        // In pratiksha user adding followers , ie shivani(authUser.uid) follows pratiksha
        // ...userProfile means previous followers
        if (userProfile)
          setUserProfile({
            ...userProfile,
            followers: [...userProfile.followers, authUser.uid],
          });
        localStorage.setItem(
          "user-info",
          JSON.stringify({
            // previous array of authUser along with new following array
            ...authUser,
            following: [...authUser.following, userId],
          })
        );
        setIsFollowing(true);
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    // authUser is shivani, it checks whether shivani is following pratiksha(userId) or no
    if (authUser) {
      const isFollowing = authUser.following.includes(userId);
      // console.log("isFollowing", isFollowing);
      setIsFollowing(isFollowing);
    }
  }, [authUser, userId]);

  return { isUpdating, isFollowing, handleFollowUnFollowUser };
};

export default useFollowUnFollow;
