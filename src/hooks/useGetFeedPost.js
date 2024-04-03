import { useState, useEffect } from "react"
import usePostStore from "../store/postStore";
import useShowToast from "./useShowToast";
import userProfile from '../store/userProfileStore'
import useAuthStore from "../store/authStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";


const useGetFeedPost = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { posts, setPosts } = usePostStore();
    const showToast = useShowToast();
    const { setUserProfile } = userProfile()
    const authUser = useAuthStore((state) => state.user)

    useEffect(()=>{
        const getFeedPosts = async () => {
            setIsLoading(true);
            if(authUser.following.length === 0){
                setIsLoading(false);
                setPosts([]);
                return;
            }

            // show the post which user is only following people
            const q = query(collection(firestore,"posts"), where("createdBy", "in", authUser.following))
            try{
                const querySnapshot = await getDocs(q);
                const feedPosts = [];

                querySnapshot.forEach((doc)=>{
                  feedPosts.push({id : doc.id, ...doc.data()})
                })

                // show recent uploaded post at top
                feedPosts.sort((a,b) => b.createdAt - a.createdAt)
                setPosts(feedPosts)
            }catch(error){
                showToast("Error", error.message,"error")
            }finally{
                setIsLoading(false)
            }
        }
        if (authUser) getFeedPosts();
    },[authUser, showToast,setPosts, setUserProfile])
  return {isLoading,posts}
}

export default useGetFeedPost;
