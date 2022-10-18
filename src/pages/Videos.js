import React, { useEffect, useState } from "react";
import { storage } from "../firebase-config";
import { useLocation } from "react-router-dom"
import Home from "../components/Home";
import { ref, listAll, getDownloadURL, deleteObject } from "firebase/storage"
import { FcFilm } from "react-icons/fc"

function Videos({ isAuth }) {
  const [filelist, setFileList] = useState([]);
  let location = useLocation();
  const fileListReference = ref(storage, `videos/${location.state.name}/`);
  const deleteFile = async (fileName) => {
    const fileRef = ref(storage, `videos/${location.state.name}/${fileName}`);
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
      <Home isAuth/>
    </div>
    <div className="videoPage">
      {filelist && filelist.map((file) => {
  return (
    <div className="videoPost">
    <div>
      <lable className="fileTitle"><FcFilm size="20px"/>   {file.name}</lable>
    </div>
    <div>
    <video className="videoPlayer" controls controlsList="nodownload">
      <source src={file.url} type="video/mp4"/>
    </video>
    </div>
    <div className="deletePost">
      {isAuth && ( 
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

export default Videos;