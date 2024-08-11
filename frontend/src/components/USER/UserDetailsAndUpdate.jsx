import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getLoginUserDetails, updateUserData } from '../../redux/actions/adminAction';
import List from '../List/List';
import { Loader } from '../utils/Loader';
import { ErrorPage } from '../utils/ErrorPage';
/*
 Copy for future Aspect 

 -> What admin will see your profile
 -> how it look to admin 
 -> 
*/

export function UserDetailsAndUpdate() {
    const dispatch = useDispatch();
    const [change, setChange] = useState(false);
    const [render, setRender] = useState(false);
    const [filebg, setFileBg] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        dispatch(getLoginUserDetails(id));
    }, [dispatch, id, render]);
    const selector = useSelector(s => s.admin);
    const { loginUser } = selector;
    const handleSubmitFunction = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("pic", filebg);
        dispatch(updateUserData(formData));
    }
    function handleChange(e) {
        e.preventDefault();
        setFileBg(e.target.files[0]);
        setChange(true);
        setRender(false);
    }
    return (
        <>
            {loginUser ? <>

                <div className='container-big' style={{
                    marginTop: "100px"
                }}>
                    <div className='container-child' style={{
                        width: "200px",
                        height: "200px",
                        // border:"4px solid white",
                        borderBottom: "none",
                        margin: "0 !important"
                    }}>
                        <form action="">
                            {loginUser && <img src={loginUser.pic} alt="profile-image" className='container-big-img' 
                            data-testid="upload-image-box"
                            />}
                            <input type="file" name='pic' onChange={handleChange} data-testid="upload-image-here"/>
                            {change && <button type='submit' onClick={handleSubmitFunction}
                                style={{
                                    border: "1px solid rgba(194, 185, 185, 0.8)",
                                    backgroundColor: "transparent",
                                    cursor: "pointer",
                                    color: "white",
                                    borderRadius: "25px",
                                    padding: "5px 10px",
                                    fontWeight: "500",
                                    boxShadow: " 0 5px 15px rgba(179, 174, 174, 0.20)",
                                    letterSpacing: " 0.15rem",
                                    margin: "5px"
                                }}
                                className='hover:scale-[1.05] transition-all duration-300 ease-out cursor-pointer'
                            data-testid="update-me-image"
                            >Update Me</button>}
                        </form>
                    </div>
                    {
                        loginUser && <div className='container-child'>
                            <h2>{loginUser.name} </h2>
                            <h2>{loginUser.college_name} {loginUser.year && `(${loginUser.year})`}</h2>
                            <h2>{loginUser.degree}</h2>
                            <h2><a href={`mailto:${loginUser.email}`}>{loginUser.email} </a></h2>
                            <div style={{
                                margin: "10px 0"
                            }}>
                                {loginUser.website && <a href={loginUser.website} ><button
                                    className='btn_clickable hover:scale-[1.05] transition-all duration-300 ease-out cursor-pointer'
                                >Website</button> </a>}
                                {loginUser.linkedin && <a href={loginUser.linkedin}><button
                                    className='btn_clickable hover:scale-[1.05] transition-all duration-300 ease-out cursor-pointer'
                                >Linkedin</button></a>}
                                {loginUser.github && <a href={loginUser.github}><button
                                    className='btn_clickable hover:scale-[1.05] transition-all duration-300 ease-out cursor-pointer'
                                >Github</button></a>}
                            </div>
                            <div>
                                <Link to={'/list'}><button style={{
                                    cursor: "pointer",
                                    backgroundColor: "pink",
                                    color: "black",
                                    borderRadius: "25px",
                                    padding: "6px 12px",
                                    margin: "0 5px"
                                }}
                                data-testid="see-your-application"
                                >See Your Application</button></Link>
                                {/* <Link to={'/list'}><button style={{
                        cursor:"pointer",
                        backgroundColor:"pink",
                        color:"black",
                        borderRadius:"25px",
                        padding:"6px 12px",
                        margin:"5px"

                    }} >Update Details</button></Link> */}
                            </div>
                        </div>
                    }


                </div>
                <List />
            </> : <Loader />
            }
            {
                (!selector.loginUser && selector.error) && <ErrorPage message={"No Content 🥲"} selector={selector} />
            }
        </>
    );
}
