import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { deletePost, getAllPosts } from '../../../service/PostsService'
import DeleteAlert from '../../features/alert/Alert'
import PostsCard from './PostsCard'

let tset=["a","b","5","sad"]


const Posts = () => {
  const [alert,setAlert]=useState(false)
const [posts,setPosts]=useState()
  useEffect(()=>{
    getAllPosts().then((res)=>setPosts(res?.post))
  },[alert])

const deleteBtn=(id)=>{
  setAlert(true)

  deletePost(id)
  
  setTimeout(() => {
    setAlert(false)
  },1500 );
}


  
  return (
    <div className='container-fluid' id='postsShowCase' style={{minHeight:"100vh"}}>
      <div className={alert?'fixed-top mt-5 w-25 d-flex justify-content-center align-items-center h-100':"d-none"} >
      <DeleteAlert />
      <img
            className="w-25"
            src="https://windrosegdansk.pl/common/images/web5Busy.gif"
            alt=""
          />

      </div>
      <div className='postcardContainer  '>

{posts? (posts.map((post,index)=> {
return(
<PostsCard post={post} key={index} deleteBtn={deleteBtn} />
  
)}
).reverse()):(<img style={{width:"100px" ,height:"100px"}} src='https://windrosegdansk.pl/common/images/web5Busy.gif'/>)}
</div>
    </div>
  )
}

export default Posts