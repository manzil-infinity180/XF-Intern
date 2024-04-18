import toast from "react-hot-toast";
import {useNavigate} from 'react-router-dom'

import { getAdminDetailFailed, getAdminDetailSuccess, getAllAdminDetailSuccess, getAppliedUserDetailSuccess, getLoginUserDetailsSuccess, getUserDetailsSuccess, loginFailed, loginSuccess, otpFailed, otpSuccess, 
  registerFailed, registerSuccess } from "../admin/adminSlice";
import { getError } from "../admin/postSlice";
// const server = 'https://back-anchors-1.onrender.com'
// const server = 'https://job-internship-finders.vercel.app';
const server = `http://localhost:9009`
export const loginAdmin = (post,navigate) => async (dispatch) => {
    try{
        const url = `${server}/api/admin/login`;
       const res = await fetch(url,{
       method:"POST",
       body: JSON.stringify(post),
       credentials :'include',
       headers: {
        'Content-type':'application/json'
      },
    });
    if (!res.ok) {
        const error = new Error('An error occurred while fetching the events');
        error.code = res.status;
        error.info = await res.json();
        console.log(error.info);
        // console.log(error);
        throw error
      }

    

    const admin = await res.json();
    console.log(res);
    console.log(admin);
    dispatch(loginSuccess(admin.message));
    toast.success("OTP sent successfully");
    navigate('/verify');
         
    } catch(err){
       console.log(err);
        dispatch(loginFailed(err.info.message))
        toast.error(err.info.message)
        
    }

}
export const verifyAdmin = (post,navigate) => async (dispatch) => {
    try{
     const url = `${server}/api/admin/verify`;
     const res = await fetch(url,{
     method:"POST",
     body: JSON.stringify(post),
     credentials :'include',
     headers: {
      'Content-type':'application/json'
    },
  });
  
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = res.status;
    error.info = await res.json();
    console.log(error.info);
    // console.log(error);
    throw error;
  }

  const admin = await res.json();
  console.log(admin);
  dispatch(otpSuccess(admin.admin));
  toast.success("Login/Register Successful");
  navigate('/');

    }catch(err){
        console.log(err);
        dispatch(otpFailed(err.info.message));
        toast.error(err.info.message);

    }
}
export const registerAdmin = (post,navigate) => async (dispatch) =>{
  try{
    const url = `${server}/api/admin/register`;
    // console.log(JSON.stringify(post));
    const res = await fetch(url,{
       method:"POST",
       body: JSON.stringify(post),
       credentials :'include',
       headers: {
        'Content-type':'application/json'
      },
    });

    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data!');
      error.code = res.status;
      error.info = await res.json();
      console.log(error.info);
      // console.log(error);
      throw error;
    }

    const admin = await res.json();
    dispatch(registerSuccess(admin.admin));
    toast.success("Done 🦾");
    navigate('/verify');
  }catch(err){
    console.log(err);
    dispatch(registerFailed(err.info.message));
    toast.error(err.info.message);
  }
}
export const getAdminDetail = () => async (dispatch) =>{
  try{
    const url = `${server}/api/admin/get/admin`;
    const res = await fetch(url,{
     credentials :'include',
     headers: {
      'Content-type':'application/json'
    },
  });

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = res.status;
    error.info = await res.json();
    throw error
  }
  const admin = await res.json();
  console.log(admin);
  dispatch(getAdminDetailSuccess(admin.admin));

  }catch(err){
    dispatch(getAdminDetailFailed(err.info.err));

  }
}
export const getAllAdminDetail = (adminId) => async (dispatch) =>{
  try{
    const url = `${server}/api/admin/${adminId}`;
    const res = await fetch(url,{
     credentials :'include',
     headers: {
      'Content-type':'application/json'
    },
  });

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = res.status;
    error.info = await res.json();
    throw error
  }
  const admin = await res.json();
  console.log(admin);
  dispatch(getAllAdminDetailSuccess(admin.admin));

  }catch(err){
    dispatch(getError(err.info.err));

  }
}
export const getUserDetails = (id) => async (dispatch) =>{
  try{
    const url = `${server}/api/admin/user/${id}`;
    const res = await fetch(url,{
     credentials :'include',
     headers: {
      'Content-type':'application/json'
    },
  });

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = res.status;
    error.info = await res.json();
    throw error
  }
  const admin = await res.json();
  console.log(admin);
  dispatch(getUserDetailsSuccess(admin.user));

  }catch(err){
    dispatch(getError(err.info.err));

  }
}

// USER - Part 
export const getLoginUserDetails = () => async (dispatch) =>{
  try{
    const url = `${server}/api/v1/get-user`;
    const res = await fetch(url,{
     credentials :'include',
     headers: {
      'Content-type':'application/json'
    },
  });

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = res.status;
    error.info = await res.json();
    throw error
  }
  const user = await res.json();
  console.log(user);
  dispatch(getLoginUserDetailsSuccess(user.data.user));

  }catch(err){
    dispatch(getError(err.info.err));

  }
}

// Change the status of Post (User Applied)
export const changeStats = (post) => async (dispatch) =>{
  try{
    const url = `${server}/api/post/status`;
    const res = await fetch(url,{
      method:"PATCH",
      body:JSON.stringify(post),
     credentials :'include',
     headers: {
      'Content-type':'application/json'
    },
  });

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = res.status;
    error.info = await res.json();
    throw error
  }
  const user = await res.json();
  console.log(user);
  toast.success(user.message);
  // dispatch(getLoginUserDetailsSuccess(user.data.user));

  }catch(err){
    console.log(err);
    dispatch(getError(err.info.err));
    // toast.error(err.info.message);

  }
}
export const updateUserData = (post) => async (dispatch) =>{
  try{
    const url = `${server}/api/v1/update/details`;
    const res = await fetch(url,{
      method:"PATCH",
      body:post,
     credentials :'include'
  });

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = res.status;
    error.info = await res.json();
    throw error
  }
  const user = await res.json();
  console.log(user);
  toast.success("Updated Profile Image");
  dispatch(getLoginUserDetailsSuccess(user.detail));
  setTimeout(()=>{
    location.reload();
  },350);
  
  }catch(err){
    console.log(err);
    dispatch(getError(err.info.err));
    console.log(err.info);
    toast.error(err.info.message)
    // toast.error(err.info.message);

  }
}
export const updateAdminData = (post) => async (dispatch) =>{
  try{
    const url = `${server}/api/admin/update/details`;
    const res = await fetch(url,{
      method:"PATCH",
      body:post,
     credentials :'include'
  });

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = res.status;
    error.info = await res.json();
    throw error
  }
  const user = await res.json();
  console.log(user);
  toast.success("Updated Profile Image");
  dispatch(getAdminDetailSuccess(user.detail));
  setTimeout(()=>{
    location.reload();
  },350);
  
  }catch(err){
    console.log(err);
    dispatch(getError(err.info.err));
    console.log(err.info);
    toast.error(err.info.message)
    // toast.error(err.info.message);

  }
}