import { create } from "zustand"

const usePostStore = create((set) => ({
    posts: [],

    // Over here , latest updated post on profile tab is show at top ie;[post, ...state.posts]along with previous post attached
    createPost : (post) => set((state) => ({
        posts: [post, ...state.posts]
    })),

    // set the post
    setPosts: (posts) => set({posts}),
    // Delete post
    deletePost: (id) => set((state) => ({posts: state.posts.filter((post) => post.id !== id)})),
    // Comment on Post, postId is which post you want to add a comment
    // if than is not the post , just return the post
    addComment: (postId,comment) =>
            set((state) => ({
                posts: state.posts.map((post)=>{
                    if(post.id === postId){
                        return {
                            ...post,
                            comments: [...post.comments,comment]
                        }
                    }
                    return post
                })
            }))
}))

export default usePostStore;