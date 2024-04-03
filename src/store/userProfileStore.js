import { create } from "zustand";

const userProfileStore = create((set) => ({
  // Initial state of user
  userProfile: null,
  // Set the initial state of user with set(userProfile(old data) : userProfile(new data))
  setUserProfile: (userProfile) => set({ userProfile }),

  // this is used to update the number of posts in the profile page, shows the count of post
  addPost: (post) =>
    set((state) => ({
      userProfile: {
        ...state.userprofile,
        posts: [post.id, ...state.userProfile.posts],
      },
    })),

  // it decrement the count of post
  decrementPostsCount: (postId) =>
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        posts: state.userProfile.posts.filter((id) => id !== postId),
      },
    })),
}));

export default userProfileStore;
