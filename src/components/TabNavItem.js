import React from "react";
const TabNavItem = ({ id, title, activeTab, setActiveTab, setfileUploadType }) => {
 
 const handleClick = () => {
   setActiveTab(id);
   if(id == "uploadFiles"){
    setfileUploadType("File")
   }
   else if(id == "uploadVideos"){
    setfileUploadType("Video")
   }
 };
 
return (
   <li onClick={handleClick} className={activeTab === id ? "active" : ""}>
     { title }
   </li>
 );
};
export default TabNavItem;