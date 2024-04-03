import { useState } from "react"
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import commentPost from "../store/postStore"
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";



const usePostComment = () => {
    const [ isCommenting, setIsCommenting ] = useState(false);
    const showToast = useShowToast();
    const authUser = useAuthStore((state) => state.user)
    const addComment  = commentPost((state) => state.addComment)
  

    const handlePostComment = async ( postId, comment) => {
        if(isCommenting) return ;
        if (!authUser) return showToast("Error", "You must be logged in to comment", "error");
		setIsCommenting(true);
		const newComment = {
			comment,
			createdAt: Date.now(),
			createdBy: authUser.uid,
			postId,
		};
        try {
            // arrayUnion : specifically to add elements to an array while ensuring that each element is unique.
            await updateDoc(doc(firestore,"posts", postId),{
                comments: arrayUnion(newComment)
            });
            // add comment in UI
            addComment(postId,newComment)

        }catch(error){
            showToast("Error", error.message, "error");
        }finally{
            setIsCommenting(false)
        }
    }
  
    return {
        isCommenting,handlePostComment
  }
}

export default usePostComment
