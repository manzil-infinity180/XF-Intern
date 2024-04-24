import {QueryClient} from "@tanstack/react-query"
export const queryclient = new QueryClient();

// const server = 'https://back-anchors-1.onrender.com'
// const server = 'https://job-internship-finders.vercel.app';
// const server = `http://localhost:9009`
const server = `https://xfintern-backend.onrender.com`;

const removeCookies = () => {
  sessionStorage.removeItem("loginValue");
}
const cookiesState = (valueX) => {
  if(sessionStorage.getItem("loginValue")){
    sessionStorage.removeItem("loginValue");
  }
  sessionStorage.setItem("loginValue",JSON.stringify(valueX));
}

export async function getRegister(post){
    const url = `${server}/api/v1/register`;
    // console.log(JSON.stringify(post));
    const res = await fetch(url,{
       method:"POST",
       body: JSON.stringify(post),
       credentials :'include',
       headers: {
        'Content-type':'application/json'
      },
    });
    // console.log(res);
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = res.status;
      error.info = await res.json();
      throw error;
    }
    const {data} = await res.json();   
    console.log(data);
    const valueX = {
      admin:false,
      user:true
    }
    if(sessionStorage.getItem("loginValue")){
      sessionStorage.removeItem("loginValue");
    }
    sessionStorage.setItem("loginValue",JSON.stringify(valueX));
    
    return data;
}

export async function getLogin(post){
    const url = `${server}/api/v1/login`;
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
      throw error
    }
    const {data} = await res.json();   
    const valueX = {
      admin:false,
      user:true
    }
    if(sessionStorage.getItem("loginValue")){
      sessionStorage.removeItem("loginValue");
    }
    sessionStorage.setItem("loginValue",JSON.stringify(valueX));
    return data;
}
export async function getVerify(post){
  console.log(JSON.stringify(post));
  const url = `${server}/api/v1/verify`;
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
    console.log(error);
    if(!error.info.message.includes("Incorrect OTP please check it out")){
      sessionStorage.removeItem("loginValue");
      
    }
   
    throw error
  }
  const valuedemo = JSON.parse(sessionStorage.getItem("loginValue"));
    valuedemo.verify = true;
    console.warn(valuedemo);
    cookiesState(valuedemo);
  const {data} = await res.json();   
  return data;
}
export async function createProfile(post){
  const url = `${server}/api/v1/profile`;
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
    throw error
  }
  console.log(res);
  const {data} = await res.json();   
  console.log(data);
  return data;
}
export async function uploadUserPhoto(post){
  const url = `${server}/api/v1/update-pic`;
  const res = await fetch(url,{
     method:"PATCH",
     body: post,
     credentials :'include',
    //  headers: {
    //   'Content-type':'application/json'
    // },

  });
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = res.status;
    error.info = await res.json();
    throw error
  }
  const {data} = await res.json();   
  return data;
}
export async function addExperience(post){
  const url = `${server}/api/v1/exp`;
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
    throw error
  }
  const {data} = await res.json();   
  return data;
}
// export async function getInternData(){
//   const url = 'https://job-56wq.onrender.com/api/v1';
//   const res = await fetch(url,{
//      credentials :'include',
//      headers: {
//       'Content-type':'application/json'
//     },

//   });
//   if (!res.ok) {
//     const error = new Error('An error occurred while fetching the events');
//     error.code = res.status;
//     error.info = await res.json();
//     throw error
//   }
//   const {data} = await res.json();   
//   return data;
// }

export async function getAppliedData(){
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
    // console.log(error.info);
    throw error
  }
  const {data} = await res.json();   
  return data;
}
export async function addToApplied(post){
  console.log(post);
  console.log(JSON.stringify(post));
  const url = `${server}/api/v1/applied`;
  console.log(post);
  const res = await fetch(url,{
     method:"POST",
     body: JSON.stringify(post),
     credentials :'include',
     headers: {
      'Content-type':'application/json'
    },

  });
  console.log(res);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = res.status;
    error.info = await res.json();
    console.log(error.info);
    
    throw error
  }
  const {data} = await res.json();   
  return data;
}
export async function logoutUser(){
  const url = `${server}/api/v1/logout`;
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
  const data = await res.json();
  sessionStorage.removeItem("loginValue");    
  console.log(data);
  return data;
}
export async function logoutAdmin(){
  const url = `${server}/api/admin/get/logout`;
  const res = await fetch(url,{
    credentials :'include',
    headers: {
     'Content-type':'application/json'
   },
  });
  console.log(res);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = res.status;
    error.info = await res.json();
    throw error
  }

  const data = await res.json();  
  console.log(data);
  sessionStorage.removeItem("loginValue"); 
  console.log(data);
  return data;
}
export async function searchField(post){
  console.log(post);
  const url = `${server}/api/post/search`;
  const res = await fetch(url,{
     method:"POST",
     credentials :'include',
     body:JSON.stringify(post),
     headers: {
      'Content-type':'application/json'
    },
  });
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = res.status;
    error.info = await res.json();
    console.log(error.info)
    throw error
  }
  const data = await res.json(); 
  console.log("data");
  console.log(data);  
  return data;
}
export async function autoCompleteFunc(post){
  console.log(post);
  const url = `${server}/api/post/autocomplete`;
  const res = await fetch(url,{
     method:"POST",
     credentials :'include',
     body: JSON.stringify(post),
     headers: {
      'Content-type':'application/json'
    },
  });
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = res.status;
    error.info = await res.json();
    console.log(error.info)
    
    throw error
  }
  const data = await res.json(); 
  console.log("data");
  console.log(data);  
  return data;
  
}
