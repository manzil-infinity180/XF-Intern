import { useState } from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import { appliedPost } from "../../redux/actions/postAction";
export function JobDetails({data}) {
    const timestamp = new Date(data.start);
    const dispatch = useDispatch();
    const [details,setDetails] = useState(false);
    const options = { month: 'long', year: 'numeric' };
    const formattedDate = timestamp.toLocaleDateString('en-US', options);
    const navigate = useNavigate();
    function togglePopup(){
        setDetails(!details);
        if (!details) {
            document.querySelector('.blurMe').classList.add('blur-background')
            // document.body.classList.add('blur-background');
          } else {
            document.querySelector('.blurMe').classList.remove('blur-background')
          }
    }
    function handleApply(){
        dispatch(appliedPost(data));  
    }
    return (
        <>
            <div className="flex items-center my-10 flex-col justify-center blurMe">
                    <div className='w-3/5 p-9 rounded-lg my-8' style={{
                        backgroundColor: "#0a101f"
                    }}>
                        <div className='flex justify-center'>
                            <div>
                                <h1 className='text-3xl tracking-wider' style={{
                                    cursor:"pointer"
                                }} onClick={()=> navigate(`/admin/${data.adminId}`)}> {data.companyName.toUpperCase()}</h1>
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <div>
                                {data.name}
                            </div>
                        </div>
                        <div className="flex justify-between mt-10">
        
                            <span className='font-bold tracking-wider mx-2'>Stipend/Salary</span>
                            <span className='font-bold tracking-wider mx-2'>Type</span>
                            <span className='font-bold tracking-wider mx-2'>Duration</span>
                            <span className='font-bold tracking-wider mx-2'>Date</span>
                        </div>
                        <div className="flex justify-between mt-1">
                            <span className='mx-2 font-normal'>{data.salary}/month</span>
                            <span className='mx-2 font-normal' >{data.type}</span>
                            <span className='mx-2 font-normal' >{data.duration} Months</span>
                            <span className='mx-2 font-normal' >{formattedDate}</span>
                        </div>
                        <div className='flex justify-center mt-5 '>
                            <button className='btn_applied' onClick={handleApply}>Apply</button>
                            <button className='btn_applied' onClick={togglePopup}>Details</button>
                        </div>
                    </div>
                </div>

                {details && <div className='popup'> 
                 <div className="popup-content">
                  <span className="close" onClick={togglePopup}>&times;</span>
       
                    <h1>Details</h1>
                    <h3>Company: {data.companyName.toUpperCase()}</h3>
                    <h3>Role: {data.name}</h3>
                    <p>Description: {data.description}</p>
                    <p>Skills: {data.skills}</p>
                    <p>Salary:{data.salary} / months</p>
                </div>

                </div>}
                
               
        </>
    );
}