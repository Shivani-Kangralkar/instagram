import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

const useSignUpWithEmailAndPassword = () => {

  const [
    createUserWithEmailAndPassword, 
    loading, 
    error
  ] = useCreateUserWithEmailAndPassword(auth);

  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);


  const signup = async ( inputs ) => {
    // If any of above fields are empty which creating account, show the error message
    if(!inputs.email || !inputs.password || !inputs.username || !inputs.fullName){
      showToast("Error","Please fill all the fields", "error")
      return
    }

    // Check if already user has same username exist 
    // Like johndeo@gmail.com 
    // johndeo (Same username account should not be created)
    const usersRef = collection(firestore, "users");
		const q = query(usersRef, where("username", "==", inputs.username));
		const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log("kk",doc.id, " => ", doc.data());
    });


    // If checked user exist (If not empty means user exists)
    if (!querySnapshot.empty) {
			showToast("Error", "Username already exists", "error");
			return;
		}

    try {
      // Create a new user in auth
      const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
      if(!newUser && error) {
        showToast("Error",error.message, "error")
        return
      }
      //If user is created in Auth , Than create user details in Firebase storage db
      //All user details for created insta account
      if(newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email,
          username:inputs.username,
          fullName:inputs.fullName,
          bio:"",
          profilePicURL:"",
          followers:[],
          following: [],
          posts:[],
          createdAt: Date.now()
        };

        // Firestore add a document, add this userDoc object on cloud firestore,
        // Select add a document
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);

        // Also store user info on local storage
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      }
    }
    catch (error) {
      console.log("catch", error);
      showToast("Error", error.message,"error")
    }
  }
  return {loading,error,signup};
};

export default useSignUpWithEmailAndPassword;
