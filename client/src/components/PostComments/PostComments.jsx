import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostDetails } from "../../service/PostsService";
import { Card } from "react-bootstrap";
import { createComment, deleteComment, getPostComments } from "../../service/commentsService";
import { AiOutlineDelete } from "react-icons/ai";
import { getUserById } from "../../service/userServices";


const PostComments = () => {
  const [post, setPost] = useState();
  const [postComments, setPostComments] = useState([]);


  const [newComment,setNewComment]=useState()

  const handelChange=(e)=>{

    setNewComment(e.target.value)

  }

  const deleteCommentBtn=(some)=>{
    deleteComment(some).catch(error=>console.log(error))
  }
  
  let id = useParams().id;


  const sendComment=()=>{
    createComment(newComment,id)
    setNewComment("")

  }

  // console.log(post.user)

  // console.log(id);


console.log()
  useEffect(() => {
    getPostDetails(id).then((res) => setPost(res.post));
    getPostComments(id).then((res)=>setPostComments(res.post.comments))
  },[postComments]);

  const isLoggedUser=(index)=>{
    if(localStorage.getItem("userId")==post.user||localStorage.getItem("userId")==postComments[index].user){

      return true
    }
  
      return false
  
  }

  return (
<div className="" style={{minHight:"100vh"}}>
    {post&&(
    <div className="d-flex row justify-content-center container-fluid"  >

<Card style={{background:"rgba(59,177,153,255)"}}
      
      className="mt-4 mb-4 p-2 border-0 cardContainer col-lg-6"
    >
      <div className="top ">
        <div className="avatar p-2">
          <img
            className=""
            width={50}
            src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-fMXEWyzl7MNd3Q15JOeyzHxasfVIHK6K_A&usqp=CAU"}
          />
          
        </div>
        <div>
          <div className="mx-3">
            <span className="d-block text-light"> {post.category}</span>
            <span className="text-muted">{new Date (`${post.date}`).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <Card.Img
        variant="top"
        className="img-fluid"
        src={post.image}
        style={{height:300}} 
      />
      <Card.Body className="p-2">
        <Card.Text className="fs-5 text-light">{post.title}</Card.Text>
        <hr />
        <Card.Text className="text-light">
        {post.description}
        <hr />
<span>author:{""}{post.user.name}</span>
        </Card.Text>    
    
      </Card.Body>
    </Card>
    <Card className="mt-4 mb-4 p-2 border-0 cardContainer col-lg-5 mx-1 " style={{ background:"rgba(59,177,153,255)"}}>

<div className="">
    <div className="mt-5 d-flex justify-content-center  ">
        <input type="text" onChange={(e)=>handelChange(e) } value={newComment}/>
        <button onClick={sendComment}>comment</button>
    </div>

    <div className="comentsContainer mt-3" id="">
{postComments&&postComments.map((coment,index)=>{
    return (
        
        <div className="comments p-2">
          
  <img className=" rounded-5 mb-2" style={{width:35,height:35}} src={coment.image}/><span className="CommentName">{coment.name}
  {isLoggedUser(index) ? (
          
          
          <a className="mb-5 btn text-danger float-end  " >
            <AiOutlineDelete onClick={()=>deleteCommentBtn(coment._id)}/>

          </a>
          
        
        
      ):""}
  </span>
  <div>
  {coment.commentBody} 

  </div>
          
       

        </div>
    )
})}

    </div>
</div>
    </Card>
    </div>
    )}
    </div>
    
    
  );
};

export default PostComments;