import {configureStore} from "@reduxjs/toolkit"

import authReducer from "./userReducer"

export const userStore=configureStore({

reducer:authReducer,
})

