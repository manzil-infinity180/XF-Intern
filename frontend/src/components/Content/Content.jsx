import { useState } from 'react';
import { Loader } from '../utils/Loader';
import { addToApplied, getAppliedData } from '../utils/http';
import { useDispatch } from 'react-redux';
import './Content.css'
import toast from 'react-hot-toast';
import { useMutation,useQuery } from "@tanstack/react-query"
import {Link, useNavigate } from "react-router-dom"
import { addBookmark } from '../../redux/actions/postAction';
function Content({data,applyBool,withdraw=false,error}) {
     console.log(data);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [applied,setApplied] = useState({});
    const [details,setDetails] = useState(false);
    const {mutate,isLoading,isPending,isError} = useMutation({
        mutationFn: addToApplied,
        onSuccess: () => {
            toast.success("Successfully Applied"); 
      },
      onError : (error)=>{
        console.log(error);
          toast.error(error.info.err)
      },

    })

    const {data:isRegistered} = useQuery({
        queryKey:['profile'],
        queryFn: getAppliedData
    });
  

    isRegistered && console.log(isRegistered);
    


    function handleClick(){        
            setApplied(data);
            console.log(data);
            mutate(data); 
    }
    function togglePopup(){
        setDetails(!details);
        if (!details) {
            document.querySelectorAll('.blurMe').forEach((element)=>{
                element.classList.add('blur-background');
            });
          } else {
            document.querySelectorAll('.blurMe').forEach((element)=>{
                element.classList.remove('blur-background');
            });
          }
    }
    function handleBookmark(){
        const post = {
            bookmark_id : data._id
        };
        dispatch(addBookmark(post,navigate));
    }
    return (
        <>
       {data ? <div className='w-2/3 p-9 rounded-lg my-8 content-bg-image blurMe' style={{
            // backgroundColor:"#0a101f"
        }}>
             {
             /* --------------- IMAGE SECTION ------
             <div style={{
            display:"flex",
            justifyContent:"center",
            marginBottom:'10px'
        }}>
            <img src={data.logo} alt="img-company" style={{
                width:"80px",
                // height:"100px
            }} loading='lazy'/>
        </div> */}
       <div className='flex justify-center'>
        <div>
           <h1 className='title-content-text'> {data.companyName.toUpperCase()}</h1>
        </div>
        </div>
        <div className='flex justify-center'>
        <div>
            {data.name}
        </div>
        </div>
        <div className="flex justify-between mt-10 content-salary">
        {/* <div className='tracking-wider'>Experience</div>
        <div>Stipend</div>
        <div>Type</div> */}
        <span className='font-bold tracking-wider mx-2'>Stipend/Salary</span>
        <span className='font-bold tracking-wider mx-2'>Type</span>
        <span className='font-bold tracking-wider mx-2'>Duration</span>

</div>
<div className="flex justify-between mt-1">
        <span className='mx-2 font-normal'>{data.salary}/month</span>
        <span className='mx-2 font-normal' >{data.type}</span>
        <span className='mx-2 font-normal'>{data.duration} months</span>
</div>
    <div className='flex justify-center mt-5 content-button-style'>
       <button className='btn_applied hover:scale-[1.05] transition-all duration-300 ease-out cursor-pointer' onClick={handleClick}>{applyBool && "✅ "}Apply</button>
       <button className='btn_applied hover:scale-[1.05] transition-all duration-300 ease-out cursor-pointer' onClick={togglePopup}>Details</button>
       {withdraw && <button className='btn_applied' 
    //    onClick={handleClick}
       >
        {/* {applyBool && "✅ "} */}
       {withdraw && "❌ Withdraw "}</button>}
       {/* <button className='btn_applied'>{data.status==='pending' ? '🟡 Pending' :
        data.status ==='notselected' ? '🔴 Not Selected ' : '🟢 Selected'}
       
       </button>  */}
    </div>

        </div> : <Loader />}

        {details && <div className='popup'> 
                 <div className="popup-content">
                  <span className="close" onClick={togglePopup}>&times;</span>
       
                    <h1>Details</h1>
                    <h3>Company: {data.companyName.toUpperCase()}</h3>
                    <h3>Role: {data.name}</h3>
                    <div className='description-text'>
                    { 
                   data.description.split('\n').map((el,line) =>(<h4>{el}</h4>) )
                   }
                    </div>
                  
                    <p>Skills: {data.skills}</p>
                    <p>Salary:{data.salary} / months</p>
                    <button style={{borderRadius:"24px"}} className='btn_applied hover:scale-[1.05] transition-all duration-300 ease-out cursor-pointer'>
                    
                    {
                        data && data.adminId &&  <Link to={`/admin/${data.adminId}`}
                        >Openings</Link>
                    }
                    {
                        data && data.companyId && <Link to={`/admin/${data.companyId}`}
                        >Openings</Link>
                    }
                        </button>
                <button style={{borderRadius:"24px"}} className='btn_applied hover:scale-[1.05] transition-all duration-300 ease-out cursor-pointer' onClick={handleClick}>{applyBool && "✅ "}Apply</button>
                <button style={{borderRadius:"24px"}} className='btn_applied hover:scale-[1.05] transition-all duration-300 ease-out cursor-pointer' onClick={handleBookmark}>Bookmark</button>
                </div>
                
                </div>}
               
        </>
    );
}

export default Content;