import React, { useEffect, useState, useMemo } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function Departments({ isAuth }) {
  const [departmentLists, setDepartmentList] = useState([]);
  const departmentsCollectionRef = collection(db, "departments");
  const deleteDepartment = async (id) => {
    const departmentDoc = doc(db, "departments", id);
    await deleteDoc(departmentDoc);
  };
  let navigate = useNavigate();
  const gotoDepartmentHome = (department) => {
    navigate("/home", {state:{name:department}});
  };

  useMemo(() => {
    const getDepartments = async () => {
      const data = await getDocs(departmentsCollectionRef);
      setDepartmentList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getDepartments();
  }, [deleteDepartment]);

  return (
    <div className="department">
      {departmentLists.map((department) => {
        return (
          <div className="post">
              <div>
                <linkbutton onClick={e => gotoDepartmentHome(department.title)}><h3 className="title"> {department.title}</h3></linkbutton>
              </div>
              <div className="deletePost">
                {isAuth && department.author.id === auth.currentUser.uid && ( 
                  <button
                    onClick={() => {
                        deleteDepartment(department.id);
                    }}
                  >Delete
                  </button>
                )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Departments;
