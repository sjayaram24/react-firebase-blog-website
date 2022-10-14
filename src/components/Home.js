import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"

function Home({ isAuth }) {
  let location = useLocation();
  let navigate = useNavigate();
  const department = location.state.name;

    const goToPosts = () => {
        navigate("/posts", {state:{name:department}})
    };

    const goToVideos = () => {
    navigate("/videos", {state:{name:department}})
    };

    const goToFiles = () => {
        navigate("/files", {state:{name:department}})
    };
  
  return (
    <div className="secondaryNav">
    <div className="secondaryNavHeader"><h1>{location.state.name}</h1></div>
    <nav>
      <ul>
        <li><linkbutton onClick={goToPosts}>News and Events</linkbutton></li>
        <li><linkbutton onClick={goToVideos}> Videos </linkbutton></li>
        <li><linkbutton onClick={goToFiles}> Files </linkbutton></li>
        </ul>
      </nav>
      </div>
  );
}

export default Home;
