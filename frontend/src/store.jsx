import {configureStore } from "@reduxjs/toolkit"
import accountSlice from "./features/accountSlice"

const store = configureStore({
    reducer:{
        user:accountSlice
    }
});

export default store;