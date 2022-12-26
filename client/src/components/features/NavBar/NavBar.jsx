import "../NavBar/NavStyle.css";
import { useState } from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getSms } from "../../../service/userServices";

function NavBarapp() {
const defaultLinks = ["HOME","POSTS", "SignIn/SignUp"];
const logedInLinks = ["HOME","POSTS", "NEW POST","PROFILE"];

const [scroll,setScroll]=useState(false)

const isScrolled=()=>{
  if(window.scrollY>99){
    setScroll(true)
  }
  else{
    setScroll(false)
  }
}

window.addEventListener("scroll",isScrolled)


const isLoggedIn=useSelector(state=>state.isLoggedIn)

// useEffect(()=>{
//   if(isLoggedIn){
//     getSms()
//   }
 
// },[])
  return (
    <Navbar collapseOnSelect expand="lg"  className={scroll?"  fixed-top  navbar-bg":"navbarcontain "} >
      <Container>
        <Navbar.Brand href="/"><img src="logo.png" className="w-50 rounded-3  d-none d-md-block" alt="" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto ">
      
          </Nav>
          <Nav>
            
            {isLoggedIn?logedInLinks.map((link)=>{
              return (
                <Nav.Link className="text-light" as={Link}  to={`/${link === "HOME" ? "" : link}`}>
              {link}
            </Nav.Link> 
              )
            })
            :( defaultLinks.map((link)=>{
              return (
                <Nav.Link className="text-light" as={Link} to={`/${link=="HOME" ? "":link}`}>
              {link}
            </Nav.Link> 
              )
            }))}
           
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarapp;