import React from "react";
import SignIn from "./signIn";
import "./Auth.css";
import SingUp from "./SingUp";
import { useState } from "react";

const Auth = () => {
  const [isSingIn, setIsSingIn] = useState(true);

  const handelSingIn = () => {
    setIsSingIn(!isSingIn);
  };


  return (
    <div className="main" style={{height:"120vh"}}>
      {isSingIn ? (
        <SignIn handelSingIn={handelSingIn} />
      ) : (
        <SingUp handelSingIn={handelSingIn} />
      )}
    </div>
  );
};

export default Auth;
