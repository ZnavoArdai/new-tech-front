import axios from "axios";

axios.defaults.baseURL = "http://localhost:6060/";



export const createComment = async(someData,id) => {
  const res = await axios.post(`comments/api/${id}`, {
commentBody:someData,
user:localStorage.getItem("userId"),
name:localStorage.getItem("userName"),
image:localStorage.getItem("userImage")
  });

  const data=await res.data;
  return data
};

export const getPostComments=async(id)=>{

    const res=await axios.get(`/comments/api/${id}`).catch((error)=>console.log(error))


    const data=await res.data;
return data;
  }

  export const deleteComment=async(id)=>{

    const res=await axios.delete(`/comments/api/${id}`).catch((error)=>console.log(error))


    const data=await res.data;
return data;
  }