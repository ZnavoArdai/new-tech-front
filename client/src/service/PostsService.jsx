import axios from "axios";

axios.defaults.baseURL = "http://localhost:6060/";
export const getAllPosts = async () => {
  try {
    const res = await axios.get("posts/api/");

    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};



export const newPost = async(someData) => {
  const res = await axios.post("posts/api/", {
    category:someData.category,
    date: someData.date,
    title: someData.title,
    image: someData.image,
    description:someData.subject,
    user:localStorage.getItem("userId"),
    
  });

  const data=await res.data;
  return data
};

export const getPostDetails = async (some) => {
    const res = await axios.get(`/posts/api/${some}`).catch((err) => console.log(err));
   
    const resData = await res.data;
    return resData;
  };

  export const updatePostDetails = async (some,id) => {
    const res = await axios.put(`/posts/api/${id}`,{
        title: some.title,
        description: some.subject,
        image: some.image,
        category: some.category,
        
    }).catch((err) => console.log(err));
   
    const resData = await res.data;
    return resData;
  };

  export const deletePost=async(id)=>{

    const res=await axios.delete(`/posts/api/${id}`).catch((error)=>console.log(error))


    const data=await res.date;
    
  }
