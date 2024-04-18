import { useEffect, useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { getAdminDetail, updateAdminData } from '../../redux/actions/adminAction';
import { Link } from 'react-router-dom';
import './Admin.css';
import { getAllPost } from '../../redux/actions/postAction';
import { AdminAllPost } from './AdminAllPost';
import { Loader } from '../utils/Loader';
export function UpdateAdmin() {
    const [change, setChange] = useState(false);
    const [render, setRender] = useState(false);
    const [filebg,setFileBg] = useState(null);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAdminDetail());
        // dispatch(getAllPost());
    },[dispatch]);
    const {admin} = useSelector(s=>s.admin);
    // console.log(selector);
    const handleSubmitFunction = (e)  => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image",filebg);
        console.log(formData);
        console.log(filebg);
        dispatch(updateAdminData(formData));
    }
    function handleChange(e){
        e.preventDefault();
        setFileBg(e.target.files[0]);
        setChange(true);
        setRender(false);
    }
    return (
        <>
        {admin && <div>
            <div className='container-big'>
                <div className='container-child' style={{
                    width:"200px",
                    height:"200px",
                    // border:"4px solid white",
                    borderBottom:"none",
                    margin:"0 !important"
                }}>
                    
                     <form action="">
                   { admin ? <img src={admin.image} alt="profile-image" className='container-big-img'/> : <Loader />}
                    <input type="file"  name='image' onChange={handleChange}/>
                    { change && <button type='submit' onClick={handleSubmitFunction}
                    style={{
                            border: "1px solid rgba(194, 185, 185, 0.8)",
                            backgroundColor: "transparent",
                            cursor:"pointer",
                            color:"white",
                            borderRadius:"25px",
                            padding:"5px 10px",
                            fontWeight: "500",
                            boxShadow:" 0 5px 15px rgba(179, 174, 174, 0.20)",
                            letterSpacing:" 0.15rem",
                            margin:"5px"
                    }}
                    className='hover:scale-[1.05] transition-all duration-300 ease-out cursor-pointer'
                    >Update Me</button>}
                    </form>
                </div>
                {admin && <div className='container-child'>
                    <h2>Company Name :{admin.name} </h2>
                    <h4>Summary : {admin.summary} </h4>
                    <h2>Year of Establishment : {admin.year}</h2>
                    <div style={{
                        margin:"10px 0"
                    }}>
                    {admin.website &&<a href={admin.website} ><button
                    className='btn_clickable hover:scale-[1.05] transition-all duration-300 ease-out cursor-pointer'
                    >Website</button> </a>}
                    {admin.linkedin && <a href={admin.linkedin}><button
                    className='btn_clickable hover:scale-[1.05] transition-all duration-300 ease-out cursor-pointer'
                    >Linkedin</button></a>}
                    {admin.github && <a href={admin.github}><button
                    className='btn_clickable hover:scale-[1.05] transition-all duration-300 ease-out cursor-pointer'
                    >Github</button></a>}
                    </div>

                </div>
                }

            </div> 
        </div>}
        
       {admin ? <AdminAllPost /> : <Loader />}
        </>
    );
}

