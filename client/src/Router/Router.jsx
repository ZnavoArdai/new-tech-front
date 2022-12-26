import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {Route,Routes} from "react-router-dom"
import Auth from '../components/pages/Auth/Auth'
import SignIn from '../components/pages/Auth/signIn'
import SingUp from '../components/pages/Auth/SingUp'
import Home from '../components/pages/Home/Home'
import NewPost from '../components/pages/NewPost/NewPost'
import NotFund from '../components/pages/NotFound/NotFund'
import Posts from '../components/pages/posts/Posts'
import Profile from '../components/pages/Profile/Profile'
import UpdatePost from '../components/pages/updatePost/UpdatePost'
import PostComments from '../components/PostComments/PostComments'

const Router = () => {
const isLoggedIn=useSelector((state)=>state.isLoggedIn)

  return (

    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='*' element={<NotFund/>} />

        <Route path='/POSTS' element={<Posts/>} />
        <Route path='/signIn/signUp' element={<Auth/>} />
        
        <Route path='/SignIn' element={<SignIn/>} />
        <Route path='/SignUp' element={<SingUp/>} />
        {isLoggedIn&&(<>
      
 <Route path='/PROFILE' element={<Profile/>} />
 <Route path='/NEW POST' element={<NewPost/>} />
 <Route path='/POSTS/:id' element={<UpdatePost/>} />
 <Route path='/POSTS/COMMENTS/:id' element={<PostComments/>} />

 </>
        )}
       


    </Routes>
  )
}

export default Router