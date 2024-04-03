import usePostStore from "../store/postStore";
import useShowToast from "./useShowToast"
import userProfileStore from "../store/userProfileStore";
import { useState } from "react";
import useAuthStore from '../store/authStore'
import { useLocation } from "react-router-dom";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage} from "../firebase/firebase"


const useCreatePost = () => {
    const { pathname } = useLocation();
    const showToast = useShowToast();
    const [ isLoading, setIsLoading] = useState(false)
    const authUser = useAuthStore((state) => state.user);

    const createPost = usePostStore((state) => state.createPost);

    const addPost = userProfileStore((state) => state.addPost);
    const userProfile = userProfileStore((state) => state.userProfile)


    const handleCreatePost = async (selectedFile, caption) => {
        if(isLoading) return
        if(!selectedFile) throw new Error("Please select an image")
        setIsLoading(true);

        const newPost = {
                caption: caption,
                likes: [],
                comments: [],
                createdAt: Date.now(),
                createdBy: authUser.uid,
		    };

        try{
          // console.log("inside try ", newPost);

          // created a pocref document to add post into it
          const postDocRef = await addDoc(collection(firestore,"posts"), newPost)
          const userDocRef = doc(firestore,"users",authUser.uid);

          // postDocRef.id is the id of the post
          const imageRef = ref(storage,`posts/${postDocRef.id}`);
          // update the post array
          await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id)});
          // upload the image
          await uploadString(imageRef, selectedFile,"data_url");
          // download the image
          const downloadURL = await getDownloadURL(imageRef);
          await updateDoc(postDocRef, { imageURL:downloadURL});
          newPost.imageURL = downloadURL;

          // update user interface, to update image in profile
          if( userProfile.uid === authUser.uid) createPost({...newPost, id:postDocRef.id})
          // to update number of post counts
          if(pathname !== '/' && userProfile.uid === authUser.uid) addPost({ ...newPost, id: postDocRef.id });
          showToast("Success","Post created succesfully", "success")

        }catch(error){
            showToast("Error", error.message,"error")
        }finally{
          setIsLoading(false)
        }

    }
  return {
   isLoading,handleCreatePost 
  }
}

export default useCreatePost
