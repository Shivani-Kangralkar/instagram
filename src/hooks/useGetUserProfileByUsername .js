import { useEffect, useState } from "react"
import useShowToast from "./useShowToast";
import userProfileStore from "../store/userProfileStore"
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";


const useGetUserProfileByUsername  = (username) => {
    const [isLoading , setIsLoading ] = useState(true);
    const { userProfile, setUserProfile } = userProfileStore()
    const showToast = useShowToast();

    useEffect(() => {
        const getUserProfile = async () => {
            setIsLoading(true);
            try {
              if(!username) return null
                const q = query(collection(firestore,"users"),where("username", "==", username))
                const querySnapshot = await getDocs(q)
                 if(querySnapshot.empty) return setUserProfile(null);


                 let userDoc;
                 querySnapshot.forEach((doc) => {
                    // console.log(doc.id, " => ", doc.data());
                    userDoc = doc.data()
                 })
                 setUserProfile(userDoc)

            }catch (error){
                showToast("Error", error.message,"error")
            }finally {
                setIsLoading(false)
            }
        }
        getUserProfile()
    },[setUserProfile,username,showToast])

    return {isLoading,userProfile}
}

export default useGetUserProfileByUsername 
