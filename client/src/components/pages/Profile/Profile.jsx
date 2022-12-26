import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../../service/userServices";
import { loggedOut } from "../../../store/userReducer";
import PostsCard from "../posts/PostsCard";
import ProfileCard from "../profileCard/ProfileCard";

const Profile = () => {
  const [user, setUser] = useState();
const dispatch=useDispatch()
const navigate=useNavigate()
  const id = localStorage.getItem("userId");

  useEffect(() => {
    getUserById(id)
      .then((res) => setUser(res.user))
      .catch((error) => console.log(error));
  }, []);

  const logout=()=>{
    dispatch(loggedOut)
    localStorage.removeItem("userId")
    navigate("/")

    window.location.reload()

  }

  console.log(user);
  return (
    <div className="mt-5 text-center container" style={{minHeight:"100vh"}}>
      {user && (
        <div className="d-flex justify-content-center">
          <Card style={{width:"18rem" ,background:"rgba(59,177,153,255)"}}>
            <Card.Img variant="top" src={user.image} />
            <Card.Body>
              <Card.Title className="text-light">{user.name}</Card.Title>
              <Card.Text className="text-light">{user.email} </Card.Text>
              <Button className="btn-danger" style={{ border: "none", width: 200 }} onClick={logout}>Log out</Button>
            </Card.Body>
          </Card>
        </div>
      )}

{user&&user.posts.length>0?<h1 className="mt-5" style={{color:"rgba(59,177,153,255)"}}>my posts</h1>:""} 

      <div className=" ">
<div className="row ">
{user && user.posts.map((post,index) =>
        <ProfileCard post={post} index={index}/>)}
</div>
        
      </div>
    </div>
  );
};

export default Profile;
