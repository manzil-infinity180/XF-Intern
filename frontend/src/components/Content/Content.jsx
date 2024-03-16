import { useState } from 'react';
import { Loader } from '../utils/Loader';
import { addToApplied, getAppliedData } from '../utils/http';
import './Content.css'
import toast from 'react-hot-toast';
import { useMutation,useQuery } from "@tanstack/react-query"
import {useNavigate } from "react-router-dom"
function Content({data,applyBool,withdraw=false,error}) {

    const navigate = useNavigate();
    const [applied,setApplied] = useState({});
    const {mutate,isLoading,isPending,isError} = useMutation({
        mutationFn: addToApplied,
        onSuccess: () => {
        //    console.log(datax);
            toast.success("Successfully Applied"); 
      },
      onError : (error)=>{
        // console.log(error);
          
          toast.error(error.info.err)
      },

    })

    const {data:isRegistered} = useQuery({
        queryKey:['profile'],
        queryFn: getAppliedData
    });
  

    isRegistered && console.log(isRegistered);
    


    function handleClick(){
        // console.log(data);
        // if()
        console.log(isRegistered.user.profile);
        if(isRegistered && isRegistered.user.profile.length === 0){
            toast.error("Create your profile first");
            setTimeout(()=>{
                navigate('/profile')

            },1000);
        }else{
            toast.success("Role : "+data.roleName);
            setApplied(data);
            mutate(data);
        }
        
    }
    return (
        <>
       {data ? <div className='w-3/5 p-9 rounded-lg my-8' style={{
            backgroundColor:"#0a101f"
            
        }}>
             <div style={{
            display:"flex",
            justifyContent:"center",
            marginBottom:'10px'
            
        }}>
            <img src={data.logo} alt="img-company" style={{
                width:"80px",
                // height:"100px"
                
            }}/>
        </div>
       <div className='flex justify-center'>
       
        <div>
           <h1 className='text-3xl tracking-wider'> {data.companyname}</h1>
        </div>
        </div>
        <div className='flex justify-center'>
        <div>
            {data.roleName}
        </div>
        </div>
        <div className="flex justify-between mt-10">
        {/* <div className='tracking-wider'>Experience</div>
        <div>Stipend</div>
        <div>Type</div> */}
        <span className='font-bold tracking-wider mx-2'>Stipend/Salary</span>
        <span className='font-bold tracking-wider mx-2'>Type</span>
        <span className='font-bold tracking-wider mx-2'>Experience</span>

</div>
<div className="flex justify-between mt-1">
        <span className='mx-2 font-normal'>{data.salary}/month</span>
        <span className='mx-2 font-normal' >Internship</span>
        {
            data.experience ===0 ? (<span className='mx-2 font-normal'>Fresher</span>) :(<span className='mx-2 font-normal'>{data.experience} years</span>) }
</div>
    <div className='flex justify-center mt-5 '>
       <button className='btn_applied' onClick={handleClick}>{applyBool && "✅ "}Applied</button>
       {withdraw && <button className='btn_applied' 
    //    onClick={handleClick}
       >
        {/* {applyBool && "✅ "} */}
       {withdraw && "❌ Withdraw "}</button>}
    </div>

        </div> : <Loader />}
        </>
    );
}

export default Content;