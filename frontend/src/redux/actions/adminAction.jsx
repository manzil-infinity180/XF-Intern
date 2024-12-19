import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom'

import {
  getAdminDetailFailed, getAdminDetailSuccess, getAllAdminDetailSuccess, getAppliedUserDetailSuccess, getLoginUserDetailsFailed, getLoginUserDetailsSuccess, getUserDetailsSuccess, loginFailed, loginSuccess, otpFailed, otpSuccess,
  registerFailed, registerSuccess
} from "../admin/adminSlice";
import { getError } from "../admin/postSlice";

const cookiesState = (valueX) => {
  if (sessionStorage.getItem("loginValue")) {
    sessionStorage.removeItem("loginValue");
  }
  sessionStorage.setItem("loginValue", JSON.stringify(valueX));
}


// const server = 'https://back-anchors-1.onrender.com'
// const server = 'https://job-internship-finders.vercel.app';
// const server = `http://localhost:9009`
const server = `https://xfintern-backend.onrender.com`;
export const loginAdmin = (post, navigate) => async (dispatch) => {
  try {
    const url = `${server}/api/admin/login`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(post),
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      },
    });
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = res.status;
      error.info = await res.json();
      throw error
    }
    const admin = await res.json();
    dispatch(loginSuccess(admin.message));
    const valueX = {
      admin: true,
      user: false,
    }
    // if(sessionStorage.getItem("loginValue")){
    //   sessionStorage.removeItem("loginValue");
    // }
    // sessionStorage.setItem("loginValue",JSON.stringify(valueX));

    cookiesState(valueX);
    toast.success("OTP sent successfully");
    navigate('/verify');

  } catch (err) {
    dispatch(loginFailed(err.info.message))
    toast.error(err.info.message)

  }

}
export const verifyAdmin = (post, navigate) => async (dispatch) => {
  try {
    const url = `${server}/api/admin/verify`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(post),
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      },
    });

    if (!res.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = res.status;
      error.info = await res.json();
      throw error;
    }

    const admin = await res.json();
    dispatch(otpSuccess(admin.admin));
    const valuedemo = JSON.parse(sessionStorage.getItem("loginValue"));
    valuedemo.verify = true;
    cookiesState(valuedemo);
    toast.success("Login/Register Successful");
    navigate('/home');

  } catch (err) {
    dispatch(otpFailed(err.info.message));
    toast.error(err.info.message);

  }
}
export const registerAdmin = (post, navigate) => async (dispatch) => {
  try {
    const url = `${server}/api/admin/register`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(post),
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      },
    });

    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data!');
      error.code = res.status;
      error.info = await res.json();
      throw error;
    }

    const admin = await res.json();
    dispatch(registerSuccess(admin.admin));
    const valueX = {
      admin: true,
      user: false
    }
    if (sessionStorage.getItem("loginValue")) {
      sessionStorage.removeItem("loginValue");
    }
    sessionStorage.setItem("loginValue", JSON.stringify(valueX));

    toast.success("Done 🦾");
    navigate('/verify');
  } catch (err) {
    dispatch(registerFailed(err.info.message));
    toast.error(err.info.message);
  }
}
export const getAdminDetail = () => async (dispatch) => {
  try {
    const url = `${server}/api/admin/get/admin`;
    const res = await fetch(url, {
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      },
    });

    if (!res.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = res.status;
      error.info = await res.json();
      throw error
    }
    const admin = await res.json();
    dispatch(getAdminDetailSuccess(admin.admin));

  } catch (err) {
    dispatch(getAdminDetailFailed(err.info.err));

  }
}
export const getAllAdminDetail = (adminId) => async (dispatch) => {
  try {
    const url = `${server}/api/admin/${adminId}`;
    const res = await fetch(url, {
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      },
    });

    if (!res.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = res.status;
      error.info = await res.json();
      throw error
    }
    const admin = await res.json();
    dispatch(getAllAdminDetailSuccess(admin.admin));

  } catch (err) {
    dispatch(getError(err.info.err));

  }
}
export const getUserDetails = (id) => async (dispatch) => {
  try {
    const url = `${server}/api/admin/user/${id}`;
    const res = await fetch(url, {
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      },
    });

    if (!res.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = res.status;
      error.info = await res.json();
      throw error
    }
    const admin = await res.json();
    dispatch(getUserDetailsSuccess(admin.user));

  } catch (err) {
    dispatch(getError(err.info.err));

  }
}

// USER - Part 
export const getLoginUserDetails = () => async (dispatch) => {
  try {
    const url = `${server}/api/v1/get-user`;
    const res = await fetch(url, {
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      },
    });

    if (!res.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = res.status;
      error.info = await res.json();
      throw error
    }
    const user = await res.json();
    dispatch(getLoginUserDetailsSuccess(user.data.user));

  } catch (err) {
    dispatch(getLoginUserDetailsFailed(err.info.err));
  }
}

// Change the status of Post (User Applied)
export const changeStats = (post) => async (dispatch) => {
  try {
    const url = `${server}/api/post/status`;
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(post),
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      },
    });

    if (!res.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = res.status;
      error.info = await res.json();
      throw error
    }
    const user = await res.json();
    toast.success(user.message);
    // dispatch(getLoginUserDetailsSuccess(user.data.user));

  } catch (err) {
    dispatch(getError(err.info.err));
    // toast.error(err.info.message);

  }
}
export const updateUserData = (post) => async (dispatch) => {
  try {
    const url = `${server}/api/v1/update/details`;
    const res = await fetch(url, {
      method: "PATCH",
      body: post,
      credentials: 'include'
    });

    if (!res.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = res.status;
      error.info = await res.json();
      throw error
    }
    const user = await res.json();
    toast.success("Updated Profile Image");
    dispatch(getLoginUserDetailsSuccess(user.detail));
    setTimeout(() => {
      location.reload();
    }, 350);

  } catch (err) {
    dispatch(getError(err.info.err));
    toast.error(err.info.message)
    // toast.error(err.info.message);

  }
}
export const updateAdminData = (post) => async (dispatch) => {
  try {
    const url = `${server}/api/admin/update/details`;
    const res = await fetch(url, {
      method: "PATCH",
      body: post,
      credentials: 'include'
    });

    if (!res.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = res.status;
      error.info = await res.json();
      throw error
    }
    const user = await res.json();
    toast.success("Updated Profile Image");
    dispatch(getAdminDetailSuccess(user.detail));
    setTimeout(() => {
      location.reload();
    }, 350);

  } catch (err) {
    dispatch(getError(err.info.err));
    toast.error(err.info.message)
    // toast.error(err.info.message);

  }
}