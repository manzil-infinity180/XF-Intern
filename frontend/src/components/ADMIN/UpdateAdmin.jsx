import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminDetail, updateAdminData } from '../../redux/actions/adminAction';
import './Admin.css';
import { AdminAllPost } from './AdminAllPost';
import { Loader } from '../utils/Loader';
import { ErrorPage } from '../utils/ErrorPage';
import { GoPrevPage } from '../utils/GoPrevPage';
export function UpdateAdmin() {
    const [change, setChange] = useState(false);
    const [filebg, setFileBg] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAdminDetail());
    }, [dispatch]);
    const { admin } = useSelector(s => s.admin);
    const selector = useSelector(s => s.admin);
    const handleSubmitFunction = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", filebg);
        dispatch(updateAdminData(formData));
    }
    function handleChange(e) {
        e.preventDefault();
        setFileBg(e.target.files[0]);
        setChange(true);
    }
    return (
        <>
            <GoPrevPage />
            {admin ? <>
                <div>
                    <div className='container-big'>
                        <div className='container-child div-class-container'>

                            <form action="">
                                {admin && <img src={admin.image} alt="profile-image" className='container-big-img' />}
                                <input type="file" name='image' onChange={handleChange} 
                                data-testid="image-upload-admin"/>
                                {change && <button type='submit' onClick={handleSubmitFunction}
                                    className='hover:scale-[1.05] transition-all duration-300 ease-out cursor-pointer update-me-class'
                                data-testid="update-me-btn"
                                >Update Me</button>}
                            </form>
                        </div>
                        <div className='container-child'>
                            <h2>Company Name :{admin.name} </h2>
                            <h4>Summary : {admin.summary} </h4>
                            <h2>Year of Establishment : {admin.year}</h2>
                            <div style={{
                                margin: "10px 0"
                            }}>
                                {admin.website && <a href={admin.website} ><button
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
                    </div>
                </div>
                <AdminAllPost />
            </> :
                (!admin && (!selector.admin && selector.error)) ? <ErrorPage message={"Not For You 🥲"} selector={selector} /> : <Loader />
            }
        </>
    );
}

