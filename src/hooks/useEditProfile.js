
import { useState } from "react"
import useShowToast from "./useShowToast"
import useAuthStore from "../store/authStore"
import { firestore, storage } from "../firebase/firebase"
import { getDownloadURL,ref, uploadString } from "firebase/storage"
import { updateDoc,doc } from "firebase/firestore"
import useUserProfileStore from "../store/userProfileStore"


const useEditProfile = () => {
    const showToast = useShowToast()
    const [ isUpdating, setIsUpdating ] = useState(false)
    const setAuthUser = useAuthStore((state) => state.setUser);
	const setUserProfile = useUserProfileStore((state) => state.setUserProfile);
    const authUser = useAuthStore((state) => state.user)



    const editProfile = async(inputs,selectedFile) => {

        if(isUpdating || !authUser) return;
        setIsUpdating(true)

        // storageRef where the image is stored in url folder in firebase as "profilePics/2561235212787189219817298" , (uid) 
        const storageRef = ref(storage, `profilePics/${authUser.uid}`)

        // get the reference of user information
        const userDocRef =  doc(firestore,"users",authUser.uid)

        let URL="";
        try {

            if(selectedFile){
                // console.log("file is selected", selectedFile);
                // the selected image file is in string

                await uploadString(storageRef,selectedFile,"data_url")

                // storage is were all images are stored of firebase , its the location were image should be saved in firebase

                URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`))
                // console.log("URL",URL);
            }

            

            const updatedUser = {
                ...authUser,
                fullName: inputs.fullName || authUser.fullName,
				username: inputs.username || authUser.username,
				bio: inputs.bio || authUser.bio,
				profilePicURL: URL || authUser.profilePicURL,
            }

            await updateDoc(userDocRef,updatedUser);
            localStorage.setItem("user-info", JSON.stringify(updatedUser))
            setAuthUser(updatedUser);
			setUserProfile(updatedUser);
			showToast("Success", "Profile updated successfully", "success");

        }catch(error){
            showToast("Error",error.message,"error")
        }

    }
  return {editProfile, isUpdating}
}

export default useEditProfile
