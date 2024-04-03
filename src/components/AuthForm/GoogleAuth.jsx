import { Flex,Image,Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

import { auth, firestore } from "../../firebase/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore";


import useAuthStore from "../../store/authStore";
import useShowToast from "../../hooks/useShowToast";



const GoogleAuth = ({prefix}) => {
  const showToast = useShowToast();
  const [signInWithGoogle, loading, error] = useSignInWithGoogle(auth);
  const loginUser = useAuthStore((state) => state.login);

  const handleGoogleAuth  = async () => {
    try {
      const newUser = await signInWithGoogle();
      if(!newUser && error){
        return showToast("Error", error.message,"error")
      }
      const docRef = doc(firestore, "users", newUser?.user.uid);
      const userSnap = await getDoc(docRef);
      if(userSnap.exists()){
        // login
        const userDoc = userSnap.data();
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      }else {
        // sign in
        const userDoc = {
					uid: newUser.user.uid,
					email: newUser.user.email,
					username: newUser.user.email.split("@")[0],
					fullName: newUser.user.displayName,
					bio: "",
					profilePicURL: newUser.user.photoURL,
					followers: [],
					following: [],
					posts: [],
					createdAt: Date.now(),
				};
        await setDoc(doc(firestore,"users",newUser.user.uid), userDoc)
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      }

    }catch(error){
      showToast("Error", error.message,"error")
    }
  }

  return (
    <>
      <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"} onClick={handleGoogleAuth }>
        <Image src="/google.png" w={5} alt="Google logo" />
        <Text mx="2" color={"blue.500"}>
          {prefix} with Google
        </Text>
      </Flex>
    </>
  );
};

export default GoogleAuth;
