import { useState } from 'react';
import { Loader } from '../utils/Loader';
import { addToApplied, getAppliedData } from '../utils/http';
import { useDispatch } from 'react-redux';
import {FaLinkedin,FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import './Content.css'
import toast from 'react-hot-toast';
import { useMutation,useQuery } from "@tanstack/react-query"
import {Link, useNavigate } from "react-router-dom"
import { addBookmark } from '../../redux/actions/postAction';
function Content({data,applyBool,withdraw=false,error}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [applied,setApplied] = useState({});
    const [details,setDetails] = useState(false);
    const {mutate} = useMutation({
        mutationFn: addToApplied,
        onSuccess: () => {
            toast.success("Successfully Applied"); 
      },
      onError : (error)=>{
        console.log(error);
          toast.error(error.info.err)
      },

    });


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
        dispatch(addBookmark(post));
    }
    return (
        <>
       {data ? <div className='intern-data blurMe' style={{
            // backgroundColor:"#0a101f"
        }}>
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

        <div className="intern-data-main content-salary">
        <div className='intern-data-comp'>
            <div> Stipend/Salary</div>
            {data.salary}/month
        </div>
        <div className='intern-data-comp'>
            <div>Duration</div>
            {data.duration} months
        </div>
        <div className='intern-data-comp'>
            <div>Type</div>
            {data.type}
        </div>
</div>
    <div className='btn-applied-div'>
       <button className='btn_applied hover:scale-[1.05] transition-all duration-300 ease-out cursor-pointer' onClick={handleClick}>{applyBool && "✅ "}Apply</button>
       <button className='btn_applied hover:scale-[1.05] transition-all duration-300 ease-out cursor-pointer' onClick={togglePopup}>Details</button>
       {withdraw && <button className='btn_applied'> 
       {withdraw && "❌ Withdraw "}</button>}
    </div>

        </div> : <Loader />}

        {details && <div className='popup'> 
                 <div className="popup-content">
                  
                  <div className='share-btn'>
                  <a href={`https://twitter.com/intent/post?text=${data.companyName.toUpperCase()} (Role: ${data.name}) on Xf Intern&url=https://xfintern.onrender.com/admin/${data.adminId}&via=xfintern`} target="_blank"><span className=''><FaXTwitter /></span></a>
                  <a href={`https://facebook.com/sharer/sharer.php?u=https://xfintern.onrender.com/admin/${data.adminId}`} target="_blank"><span className='share-comp'><FaFacebook /></span></a>
                  <a href={`https://linkedin.com/shareArticle/?summary=${data.companyName.toUpperCase()} (Role: ${data.name}) on Xf Intern&mini=true&url=https://xfintern.onrender.com/admin/${data.adminId}`} target="_blank"><span className='share-comp'><FaLinkedin /></span></a>
                  <span className="share-comp close" onClick={togglePopup}><ImCross /></span>
                  </div>
                  
       
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
                <button
                style={{borderRadius:"24px"}} className='btn_applied hover:scale-[1.05] transition-all duration-300 ease-out cursor-pointer' onClick={handleBookmark}>Bookmark</button>
                </div>
                
                </div>}
               
        </>
    );
}

export default Content;

/*

href="https://www.linkedin.com/shareArticle/?summary=&mini=true&url=https://wellfound.com/l/2yqGJa"

https://twitter.com/intent/post?text=Rahul Vishwakarma on Xf Intern&url=https://xfintern.onrender.com/
href="http://facebook.com/sharer/sharer.php?u=https://wellfound.com/l/2yqGJ9"
*/