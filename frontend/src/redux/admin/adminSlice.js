import { createSlice } from '@reduxjs/toolkit'

const initialAdminState = {
   isAuthenticated: false,
   loading: false,
   isRedirect: false,
   isAdmin:false,
   adminlogin:false,
   userlogin:false
};

const adminSlice = createSlice({
   name: "admin",
   initialState: initialAdminState,
   reducers: {
      loginSuccess: (state, action) => {
         state.message = action.payload
         state.isRedirect = true,
         state.error = '',
         state.isAdmin = true
      },
      loginFailed: (state, action) => {
         state.error = action.payload
      },
      userSuccess : (state) => {
         state.userlogin = true,
         state.isAuthenticated = true
      },
      otpSuccess: (state, action) => {
         state.isAuthenticated = true,
         state.isRedirect = true,
         state.user = action.payload,
         state.adminlogin = true
      },
      otpFailed: (state, action) => {
         state.isRedirect = true,
         state.error = action.payload
      },
      registerSuccess : (state,action) => {
         state.message = action.payload
         state.isRedirect = true,
         state.error = '',
         state.isAdmin = true
      },
      registerFailed : (state,action) =>{
         state.error = action.payload
      },
      getAdminDetailSuccess : (state,action) =>{
         state.admin = action.payload,
         state.loading = false
      },
      getAdminDetailFailed : (state,action) => {
         state.error = action.payload
      },
      getOtherAdminSuccess : (state,action) =>{
         state.adminOther = action.payload,
         state.loading = false
      },
      getOtherAdminFailed : (state,action) => {
         state.error = action.payload
      },
      getAllAppliedPostSuccess : (state,action) =>{
         state.allPost = action.payload,
         state.loading = false
      },
      getAllAppliedPostFailed : (state,action) =>{
         state.error = action.payload
      },
      getAllAdminDetailSuccess : (state,action) =>{
         state.adminDetail = action.payload
      },
      getAppliedUserDetailSuccess : (state,action)=>{
         state.appliedUser = action.payload
      },
      getUserDetailsSuccess : (state,action) =>{
         state.userDetail = action.payload
      },
      getLoginUserDetailsSuccess : (state,action) =>{
         state.loginUser = action.payload
      }
      // changeStatusUserAppliedSuccess : (state,action) =>{
         
      // }
   }

});

export const { 
   loginSuccess, loginFailed,
   otpFailed,otpSuccess,
   registerFailed,registerSuccess,
   getAdminDetailSuccess, getAdminDetailFailed,
   getOtherAdminFailed, getOtherAdminSuccess,
   getAllAppliedPostFailed, getAllAppliedPostSuccess,
   getAllAdminDetailSuccess,getAppliedUserDetailSuccess,
   getUserDetailsSuccess,getLoginUserDetailsSuccess,userSuccess
 } = adminSlice.actions;

export default adminSlice.reducer;
