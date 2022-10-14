import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db, storage } from "../firebase-config";
import { useLocation } from "react-router-dom"
import Home from "../components/Home";

function Posts({ isAuth }) {
  const [postList, setPostList] = useState([]);

  let location = useLocation();
  const postsCollectionRef = collection(db, location.state.name);
  const deletePost = async (id) => {
    const postDoc = doc(db, location.state.name, id);
    await deleteDoc(postDoc);
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

if(location) getPosts();
  }, []);

  return (
    <div> 
    <div>
      <Home isAuth/>
    </div>
    <div className="homePage">
      {postList && postList.map((post, index) => {
        return (
          <div className="post">
            <div className="postHeader">
              <div className="title">
                <h3><u>{post.title}</u></h3>
              </div>
              <div className="deletePost">
                {isAuth && post.author.id === auth.currentUser.uid && ( 
                  <button
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
            <div className="postTextContainer"> {post.postText} </div>
            <h5>@{post.author.name}</h5>
          </div>
        );
      })}
    </div>
    </div>
  );
}

export default Posts;
