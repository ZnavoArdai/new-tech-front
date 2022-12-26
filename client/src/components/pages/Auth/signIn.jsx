import e from "cors";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getSms, loging } from "../../../service/userServices";

import {loggedIn} from "../../../store/userReducer"

export const SignIn = ({handelSingIn}) => {
    const navigate=useNavigate()
    const [isSubmit, setIsSubmit] = useState(false);
    const [notAuthe, setNotAuthe] = useState(false);


    const [signInForm, setSingInForm] = useState({
        email: "example@gmail.com",
        password: "******",
  
      });
      const [error, setError] = useState({})
      const dispatch=useDispatch()

    
      const handeFormChange = (e) => {


        setSingInForm({ ...signInForm, [e.target.name]: e.target.value });
        console.log(signInForm);
      };
    
      const submitForm = (e) => {
        e.preventDefault();
      
        setError( validateForm(signInForm))

        if(Object.keys(error).length==0){


            loging(signInForm).then((data)=>{
              localStorage.setItem("userId",data.id)
              localStorage.setItem("userName",data.name)
              localStorage.setItem("userImage",data.image)
              getSms()


          
          }).then(()=>{dispatch(loggedIn())}).then(()=>navigate("/")).then((res)=>res?setIsSubmit(true):setIsSubmit(false)
            ).catch((error)=>setNotAuthe(true)
            )

        }

        

        
      };


     
  
    
      const validateForm = (value) => {
        const eror = {};
        let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    
        if (!value.password) {
          eror.password = "password required";
        }
       else if (value.password.length<4) {
            eror.password = "password to short";
          }
     
        if (!value.email) {
          eror.email = "email required";
        } else if (!regex.test(value.email)) {
          eror.email = "not valid";
        }
    
        return eror;
      };
  return (
    <div className="singIn">
      <Form className="card p-5">
        <Form.Text className="fs-6"><h3>Sing In</h3></Form.Text>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" name="email" onChange={(e)=>handeFormChange(e)}  />
        </Form.Group>
        <span className="text-danger">{error.email}</span>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>password</Form.Label>
          <Form.Control type="text" placeholder="******" name="password" onChange={(e)=>handeFormChange(e)}  />
        </Form.Group>
        <span className="text-danger">{error.password}</span>


        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Button className="w-50 rounded-5" style={{background:"rgba(59,177,153,255)"}} onClick={(e)=>submitForm(e)}>Log In</Button>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Button className="w-50 rounded-5" style={{background:"rgba(59,177,153,255)"}} onClick={handelSingIn}>Register</Button>
        </Form.Group>
        {    Object.keys(error).length==0 && isSubmit ?(<img className="w-25" src="https://windrosegdansk.pl/common/images/web5Busy.gif" alt="" />):Object.keys(error).length==0 && notAuthe?"you most be register":"fill all the fields"
}
      </Form>
    </div>
  );
};
export default SignIn;
