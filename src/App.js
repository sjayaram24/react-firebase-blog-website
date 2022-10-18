import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Post from "./pages/Post";
import Files from "./pages/Files";
import Videos from "./pages/Videos";
import CreatePost from "./components/CreatePost";
import Login from "./pages/Login";
import Departments from "./pages/Departments";
import CreateDepartment from "./components/CreateDepartment";
import AdminManagement from "./pages/AdminManagement";
import Home from "./components/Home";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      setUserEmail("");
      window.location.pathname = "/login";
    });
  };

  return (
    <Router>
      <nav className="topNav">
        <Link to="/"> Departments </Link>
        {!isAuth ? (
          <Link to="/login"> Login </Link>
        ) : (
          <>{ (userEmail === "suraj.jay.general@gmail.com" || userEmail === "ssatyanath.du@gmail.com") && (
            <Link to="/admin"> Manage Site </Link>)
          }
            <linkbutton onClick={signUserOut}>Logout</linkbutton>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Departments isAuth={isAuth} userEmail={userEmail}/>} />
        <Route path="/posts" element={<Post isAuth={isAuth} userEmail={userEmail}/>} />
        <Route path="/admin" element={<AdminManagement isAuth={isAuth} userEmail={userEmail}/>} />>
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} userEmail={userEmail}/>} />
        <Route path="/createdepartment" element={<CreateDepartment isAuth={isAuth} userEmail={userEmail}/>} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} setUserEmail={setUserEmail}/>} />
        <Route path="/home" element={<Home isAuth={isAuth}/>} />
        <Route path="/files" element={<Files isAuth={isAuth} userEmail={userEmail}/>} />
        <Route path="/videos" element={<Videos isAuth={isAuth} userEmail={userEmail}/>} />
      </Routes>
    </Router>
  );
}

export default App;
