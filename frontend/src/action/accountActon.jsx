import {server} from '../main'
import toast from "react-hot-toast";
// localhost://9009/
// api/v1
export const registerUser = (email) => async (dispatch) =>{
    try{
        
    const {data} = await fetch(`${server}/api/v1/register`,{
        method:"POST",
       body: JSON.stringify(email),
       credentials :'include',
       headers: {
        'Content-type':'application/json'
    }});
    dispatch({
        type:"registerSuccess",
        payload: data.user
    });
    toast.success("You are registered");
    

    }catch(err){
        dispatch({
           type:"registerFailure",
           payload:err.response.message
        });
        toast.error(err.response.message);

    }
}