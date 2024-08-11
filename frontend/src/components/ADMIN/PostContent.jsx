import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { deletePost } from '../../redux/actions/postAction';
import { useState } from 'react';
import '../Content/Content.css';
import toast from 'react-hot-toast';
export function PostContent({ data, className }) {
    const timestamp = new Date(data.start);
    const [details, setDetails] = useState(false);
    const options = { month: 'long', year: 'numeric' };
    const formattedDate = timestamp.toLocaleDateString('en-US', options);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function handleDeleteFunction() {
        if (confirm("are you really want to delete")) {
            dispatch(deletePost(data._id));
        } else {
            toast.success("OK");
        }
    }
    function togglePopup() {
        setDetails(!details);
        if (!details) {
            document.querySelector('.blurMe').classList.add('blur-background')
            // document.body.classList.add('blur-background');
        } else {
            document.querySelector('.blurMe').classList.remove('blur-background')
        }
    }
    return (
        <>
            <div className={`flex items-center my-10 flex-col justify-center blurMe`}>
                <div className='w-3/5 p-9 rounded-lg my-8 content-bg-image'>
                    <div className='flex justify-center'>
                        <div>
                            <h1 className='text-3xl tracking-wider'> {data.companyName.toUpperCase()}</h1>
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
                        <button className='btn_applied' onClick={() => navigate(`/admin/update/${data._id}`)}
                        data-testid="update-post-btn">Update Post</button>
                        <button className='btn_applied' onClick={handleDeleteFunction}
                        data-testid="delete-post-btn">Delete Post</button>
                        <button className='btn_applied' onClick={togglePopup}
                        data-testid="details-post-btn">Details</button>
                    </div>
                </div>
            </div>
            {details && <div className='popup' id='popupBlur'>
                <div className="popup-content content-bg-image">
                    <span className="close" onClick={togglePopup}>&times;</span>
                    <h1>Details</h1>
                    <h3>Company: {data.companyName.toUpperCase()}</h3>
                    <h3>Role: {data.name}</h3>
                    <p>Description: {data.description}</p>
                    <p>Skills: {data.skills}</p>
                    <p>Salary:{data.salary} / months</p>
                    <button style={{ borderRadius: "24px" }}
                        className='btn_applied hover:scale-[1.05] transition-all duration-300 ease-out cursor-pointer'
                    >
                        <Link to={`/admin/stats/${data._id}`} data-testid="who-applied">WHO APPLIED</Link>
                    </button>
                </div>
            </div>}
        </>
    );
}