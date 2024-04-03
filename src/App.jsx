
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";

function App() {

  const [ authUser] = useAuthState(auth)

  // If user is authenticated , show homepage, else show autheticated page
  // If user is not login than show auth page , else navigate to home page
  return (
    <>
      <PageLayout>
        <Routes>
          <Route path="/" element={ authUser ? <HomePage /> : <Navigate to='/auth' />} />
          <Route path="/auth" element={!authUser? <AuthPage /> : <Navigate to ='/' />} />
          <Route path="/:username" element={<ProfilePage/>} />
        </Routes>
      </PageLayout>
    </>
  );
}

export default App;
