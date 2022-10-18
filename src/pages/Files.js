import React, { useEffect, useState } from "react";
import { storage } from "../firebase-config";
import { useLocation } from "react-router-dom"
import Home from "../components/Home";
import { ref, listAll, getDownloadURL, deleteObject } from "firebase/storage"
import { FcDocument } from "react-icons/fc"
import { DocViewer } from "react-doc-viewer"

function Files({ isAuth, userEmail}) {
  const [filelist, setFileList] = useState([]);
  let location = useLocation();
  const fileListReference = ref(storage, `files/${location.state.name}/`);
  const deleteFile = async (fileName) => {
    const fileRef = ref(storage, `files/${location.state.name}/${fileName}`);
    await deleteObject(fileRef).then(() => {

    });
  };

  const getAllFiles = () => {
    listAll(fileListReference).then((response) => {
        response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
            setFileList((prev) => [...prev, {url: url, name: item.name}]);
            })
        })
    })
};

  useEffect(() => {
    getAllFiles();
    }, []);

  return (
    <div> 
    <div>
      <Home {...isAuth}/>
    </div>
    <div className="filePage">
      {filelist && filelist.map((file) => {
        return (
          <div className="filePost">
              <div className="fileTitle">
                <FcDocument size="20px"/>  <a href={file.url}>{file.name}</a>
              </div>
              <div className="deletePost">
                {isAuth && (userEmail === "suraj.jay.general@gmail.com" || userEmail === "ssatyanath.du@gmail.com") &&( 
                  <button
                    onClick={() => {
                        deleteFile(file.name);
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
        );
      })}
    </div>
    </div>
  );
}

export default Files;