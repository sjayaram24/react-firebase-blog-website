import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function CreateDepartment({ isAuth }) {
  const [title, setTitle] = useState("");

  const departmentsCollectionRef = collection(db, "departments");
  let navigate = useNavigate();

  const createDepartment = async () => {
    await addDoc(departmentsCollectionRef, {
      title,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    setTitle("");
    navigate("/");
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
          <label> Department Name</label>
          <input
            placeholder="Name..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <button onClick={createDepartment}> Create</button>
      </div>
    </div>
  );
}

export default CreateDepartment;
