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

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
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
          <>
            <Link to="/admin"> Manage Site </Link>
            <linkbutton onClick={signUserOut}>Logout</linkbutton>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Departments isAuth={isAuth}/>} />
        <Route path="/posts" element={<Post isAuth={isAuth} />} />
        <Route path="/admin" element={<AdminManagement isAuth={isAuth} />} />>
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/createdepartment" element={<CreateDepartment isAuth={isAuth}/>} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/home" element={<Home isAuth={isAuth}/>} />
        <Route path="/files" element={<Files isAuth={isAuth}/>} />
        <Route path="/videos" element={<Videos isAuth={isAuth}/>} />
      </Routes>
    </Router>
  );
}

export default App;
