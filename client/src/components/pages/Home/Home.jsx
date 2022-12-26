import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button, Card, Carousel } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { getAllPosts } from '../../../service/PostsService'
import { FaPeopleArrows } from 'react-icons/fa';
import { GrTechnology} from 'react-icons/gr';
import { FaGlobeAfrica } from 'react-icons/fa';
import CarouselApp from '../../features/Carusel/Carusel'
import { Link, NavLink } from "react-router-dom";


const Home = () => {
const isLoggedIn=useSelector(state=>state.isLoggedIn)

  const [post,setPost]=useState()

  useEffect(()=>{

    getAllPosts().then(res=>setPost(res?.post))
  },[])

  console.log(post)
  return (

  

<div className='main  text-center' >

<div >
  
<CarouselApp />
</div>
    
  <h1 className='mt-5'>Latest posts</h1>


  <div>

  {post&&(
<div className=" mt-5 d-flex justify-content-evenly row container-fluid">
<Card className='col-md-4 mt-3 imcontain ' style={{ width: "20rem"}}>
  <Card.Img className='imgHome' variant="top"  src={post&&post[post.length-1].image}/>
  <Card.Body>
    <Card.Title>{post&&post[post.length-1].title}</Card.Title>
  </Card.Body>    <Card.Text> author: {post&&post[post.length-1].user.name} </Card.Text>

</Card>
<Card className='col-md-4 mt-3 imcontain' style={{ width: "20rem"}}>
  <Card.Img className='imgHome' variant="top"  src={post&&post[post.length-2].image}/>
  <Card.Body>
    <Card.Title>{post&&post[post.length-2].title}</Card.Title>
  </Card.Body>    <Card.Text>author: {post&&post[post.length-2].user.name} </Card.Text>

</Card>
<Card className='col-md-4 mt-3 imcontain' style={{ width: "20rem" }}>
  <Card.Img className='imgHome ' variant="top"  src={post&&post[post.length-3].image}/>
  <Card.Body>
    <Card.Title>{post&&post[post.length-3].title}</Card.Title>
  </Card.Body>    <Card.Text>author: {post&&post[post.length-3].user.name} </Card.Text>

</Card>

</div>
)}
<div className='mt-5 d-flex justify-content-center mb-5'>

{!isLoggedIn&&(<>
  <Button style={{ border: "none", width: 200 ,marginRight:55,background:"rgba(59,177,153,255)"}} as={Link} to={"/signIn/signUp"} >Sing In</Button>
<Button style={{ border: "none", width: 200 ,background:"rgba(59,177,153,255)"}} as={Link} to={"/POSTS"}  >Posts</Button>
</>

)}


</div>

  </div>
  <section className="page-section mt-5 mb-5" id="services">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2 className="section-heading text-uppercase">{isLoggedIn?"WELCOME":"jOIN US"
          }
</h2>

        </div>
      </div>
      <div className="row text-center">
        <div className="col-md-4">
          <span className="fa-stack fa-4x">
            <i className="fa fa-circle fa-stack-2x ">
            <GrTechnology size={150} color={"rgba(71,63,88,255)"}/>

            </i>
            <i className="fa fa-shopping-cart fa-stack-1x fa-inverse"></i>
          </span>
          <h4 className="service-heading">Become a member</h4>
          <p className="text-muted">You can read about gaming, transformative technology, AI, AR/VR to 5G, and much more. VentureBeat is also known for organizing big events formed around innovative technology and big ideas.</p>
        </div>
        <div className="col-md-4">
          <span className="fa-stack fa-4x">
            <i className="fa fa-circle fa-stack-2x ">
            <FaGlobeAfrica size={150} color={"rgba(71,63,88,255)"}/>
            </i>
            <i className="fa fa-laptop fa-stack-1x fa-inverse"></i>
          </span>
          <h4 className="service-heading">Discover new technology</h4>
          <p className="text-muted">Find new technology, learn about new technology and get valuable tips for your journey.</p>
        </div>
        <div className="col-md-4">
          <span className="fa-stack fa-4x">
            <i className="fa fa-circle fa-stack-2x ">
              <FaPeopleArrows size={150} color={"rgba(71,63,88,255)"}/>
            </i>
            <i className="fa fa-lock fa-stack-1x fa-inverse"></i>
          </span>
          <h4 className="service-heading">latest technology 

</h4>
          <p className="text-muted">Tblogs will give you a steady stream of great ideas regarding technology. Whether it’s the news or information about the latest gadgets in the market, these blogs will bring you everything from the modern tech world!</p>
        </div>
      </div>
    </div>
  </section>

</div>
  )
}

export default Home