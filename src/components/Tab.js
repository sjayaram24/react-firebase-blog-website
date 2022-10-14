import CreateDepartment from "./CreateDepartment";
import CreatePost from "./CreatePost"
import AddFile from "./AddFile";
import React, { useState } from "react";
import TabNavItem from "./TabNavItem";
import TabContent from "./TabContent";
 
const Tabs = (isAuth) => {
  const [activeTab, setActiveTab] = useState("createDepartment");
  const [fileUploadType, setfileUploadType] = useState("");
  let prop = {
      IsAuth : isAuth,
      Type : fileUploadType
  }
 
  return (
    <div className="Tabs">
      <ul className="nav">
        <TabNavItem title="Create Department" id="createDepartment" activeTab={activeTab} setActiveTab={setActiveTab} setfileUploadType={setfileUploadType}/>
        <TabNavItem title="Add News/Event" id="createPost" activeTab={activeTab} setActiveTab={setActiveTab} setfileUploadType={setfileUploadType}/>
        <TabNavItem title="Upload Files" id="uploadFiles" activeTab={activeTab} setActiveTab={setActiveTab} setfileUploadType={setfileUploadType}/>
        <TabNavItem title="Upload Videos" id="uploadVideos" activeTab={activeTab} setActiveTab={setActiveTab} setfileUploadType={setfileUploadType}/>
      </ul>
 
      <div>
        <TabContent id="createDepartment" activeTab={activeTab}>
            <CreateDepartment isAuth/>
        </TabContent>
        <TabContent id="createPost" activeTab={activeTab}>
            <CreatePost isAuth/>
        </TabContent>
        <TabContent id="uploadFiles" activeTab={activeTab} setfileUploadType={setfileUploadType}>
            <AddFile {...prop}/>
        </TabContent>
        <TabContent id="uploadVideos" activeTab={activeTab} setfileUploadType={setfileUploadType}>
        <   AddFile {...prop}/>
        </TabContent>
      </div>
    </div>
  );
};
 
export default Tabs;