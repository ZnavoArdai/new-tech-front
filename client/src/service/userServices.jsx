import axios from "axios";

axios.defaults.baseURL = "http://localhost:6060/";
export const register = async (signUpForm) => {
  const res = await axios
    .post("user/api/register", {
      name: signUpForm.name,
      email: signUpForm.email,
      password: signUpForm.password,
      image:signUpForm.image
    })
    .catch((error) => console.log(error));

  const data = await res.data;

  return data;
};


export const loging= async (signInForm)=>{

const res=await axios.post("user/api/login",{
    email:signInForm.email,
    password:signInForm.password
}).catch((error)=>console.log(error))

const data=await res.data;

return data

}

export const getUserById= async (id)=>{
  const res= await fetch(`http://localhost:6060/user/api/${id}`)

  const newData = await res.json();
  return newData;
} 

export const getSms= async ()=>{
  const res= await fetch(`http://localhost:6060/user/api/send/sms`)

  return res;
} 