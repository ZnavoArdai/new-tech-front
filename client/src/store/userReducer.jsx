import {createSlice} from "@reduxjs/toolkit"

const authSlice=createSlice({
    name:"auth",
    initialState:{isLoggedIn:false},
    reducers:{
        loggedIn(state){
            
            state.isLoggedIn=true
        },
        loggedOut(state){
state.isLoggedIn=false;
        }
    }
});

export const  {loggedIn,loggedOut}=authSlice.actions

export default authSlice.reducer;