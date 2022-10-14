import React, { useState, useEffect } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [department, setDepartment] = useState("");
  const [departmentList, setDepartmentList] = useState([]);
  let navigate = useNavigate();
  const departmentsCollectionRef = collection(db, "departments");
  useEffect(() => {
    const getDepartments = async () => {
      const data = await getDocs(departmentsCollectionRef);
      setDepartmentList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getDepartments();
  }, []);
  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value)
  }
  const createPost = async () => {
    const postsCollectionRef = collection(db, department);
    await addDoc(postsCollectionRef, {
      title,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    setDepartment("");
    setTitle("");
    setPostText("");
    navigate("/posts", {state:{name:department}});
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <div className="inputGp">
          <label> Title</label>
          <input
            placeholder="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Department</label>
          <div className="custom-select">
            <select className="select-style" onChange={handleDepartmentChange}>
            <option value="0">Select Department</option>
            {departmentList.map((dept) => <option value={dept.title}>{dept.title}</option>)}
            </select>
          </div>
        </div>
        <div className="inputGp">
          <label> Post</label>
          {/* <input type="file"/>
          <FaCloudUploadAlt onClick={uploadFile}>Upload File</FaCloudUploadAlt> */}
          <textarea
            placeholder="Post..."
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </div>
        <button onClick={createPost}> Submit Post</button>
      </div>
    </div>
  );
}

export default CreatePost;
