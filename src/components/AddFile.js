import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa"
import { storage } from "../firebase-config"
import { ref, uploadBytes } from "firebase/storage"

function AddFile({ ...prop }) {

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
  const [fileUpload, setfileUpload] = useState(null);
  const uploadFile = () => {
    if(fileUpload == null) return;
    const fileRef = ref(storage, `${prop.Type == "File" ? "files" : "videos"}/${department}/${fileUpload.name}`)
    uploadBytes(fileRef, fileUpload).then(() => {
        setDepartment("");
        setfileUpload(null);
    const path = prop.Type == "File" ? "/files" : "/videos";
    navigate(path, {state:{name:department}});
    })
  };
  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value)
  }

  useEffect(() => {
    if (!prop.IsAuth) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <div className="inputGp">
          <label> Department</label>
          <div className="custom-select">
            <select className="select-style" onChange={handleDepartmentChange}>
            <option key="-1" value="0">Select Department</option>
            {departmentList.map((dept, index) => <option key={index} value={dept.title}>{dept.title}</option>)}
            </select>
          </div>
        </div>
        <div className="inputGp">
          <input type="file" accept={prop.Type == "File" ? ".pdf,.doc,.docx" : ".mp4"} onChange={(e) => {setfileUpload(e.target.files[0])}} />
          <button onClick={uploadFile}>Upload <FaCloudUploadAlt></FaCloudUploadAlt></button>
        </div>
      </div>
    </div>
  );
}

export default AddFile;
